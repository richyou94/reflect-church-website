// Server-only YouTube Data API v3 helper. Fetches the latest usable videos
// from a playlist for the /messages page video-card sections. Never import
// this from a Client Component — it reads the server-side YOUTUBE_API_KEY.

const PLAYLIST_ITEMS_ENDPOINT = "https://www.googleapis.com/youtube/v3/playlistItems";
// Fetched in playlist order (not yet sorted by publish date), then filtered
// and re-sorted below. Overfetching leaves enough usable videos after
// removing deleted/private/unavailable items.
const ITEMS_TO_FETCH = 20;
const VIDEOS_TO_RETURN = 4;
// Keeps the playlist response in the Next.js fetch cache for ~1 hour.
const REVALIDATE_SECONDS = 60 * 60;

const UNAVAILABLE_TITLES = new Set(["Deleted video", "Private video"]);
const THUMBNAIL_QUALITY_ORDER = ["maxres", "standard", "high", "medium", "default"] as const;

export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  /** ISO 8601 timestamp, or null when YouTube didn't report one. */
  publishedAt: string | null;
  watchUrl: string;
};

export type PlaylistVideosResult =
  | { ok: true; videos: YoutubeVideo[] }
  | { ok: false; reason: "missing-api-key" | "fetch-failed" };

type RawThumbnail = { url?: string };
type RawThumbnails = Partial<Record<(typeof THUMBNAIL_QUALITY_ORDER)[number], RawThumbnail>>;

type RawPlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: RawThumbnails;
  };
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
  status?: {
    privacyStatus?: string;
  };
};

type RawPlaylistItemsResponse = {
  items?: RawPlaylistItem[];
};

// Logs a one-line, key-free warning in development only. Production logs
// stay silent so visitors (and build/deploy logs) never see raw API errors.
function devWarn(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[youtube] ${message}`);
  }
}

function pickThumbnailUrl(thumbnails: RawThumbnails | undefined): string | null {
  if (!thumbnails) return null;
  for (const quality of THUMBNAIL_QUALITY_ORDER) {
    const url = thumbnails[quality]?.url;
    if (url) return url;
  }
  return null;
}

function toUsableVideo(item: RawPlaylistItem): YoutubeVideo | null {
  const videoId = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
  if (!videoId) return null;

  const title = item.snippet?.title;
  if (!title || UNAVAILABLE_TITLES.has(title)) return null;

  if (item.status?.privacyStatus === "private") return null;

  const thumbnailUrl =
    pickThumbnailUrl(item.snippet?.thumbnails) ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    id: videoId,
    title,
    thumbnailUrl,
    publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? null,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

// Videos with a known publish date sort newest-first; videos without one
// (rare, but YouTube can omit it) are kept after the dated ones.
function byNewestPublished(a: YoutubeVideo, b: YoutubeVideo): number {
  if (a.publishedAt && b.publishedAt) return b.publishedAt.localeCompare(a.publishedAt);
  if (a.publishedAt) return -1;
  if (b.publishedAt) return 1;
  return 0;
}

/**
 * Returns the latest 4 usable (not deleted/private/unavailable) videos from
 * a YouTube playlist, newest first. Never throws — API/network failures and
 * a missing YOUTUBE_API_KEY both resolve to `{ ok: false }` so callers can
 * render a fallback instead of crashing the page.
 */
export async function getLatestPlaylistVideos(playlistId: string): Promise<PlaylistVideosResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    devWarn(`YOUTUBE_API_KEY is not set; skipping playlist ${playlistId}.`);
    return { ok: false, reason: "missing-api-key" };
  }

  const url = new URL(PLAYLIST_ITEMS_ENDPOINT);
  url.searchParams.set("part", "snippet,contentDetails,status");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", String(ITEMS_TO_FETCH));
  url.searchParams.set("key", apiKey);

  let response: Response;
  try {
    response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch {
    devWarn(`Network error while fetching playlist ${playlistId}.`);
    return { ok: false, reason: "fetch-failed" };
  }

  if (!response.ok) {
    devWarn(`Playlist ${playlistId} request failed with status ${response.status}.`);
    return { ok: false, reason: "fetch-failed" };
  }

  let data: RawPlaylistItemsResponse;
  try {
    data = await response.json();
  } catch {
    devWarn(`Playlist ${playlistId} returned an unexpected response body.`);
    return { ok: false, reason: "fetch-failed" };
  }

  const videos = (data.items ?? [])
    .map(toUsableVideo)
    .filter((video): video is YoutubeVideo => video !== null)
    .sort(byNewestPublished)
    .slice(0, VIDEOS_TO_RETURN);

  return { ok: true, videos };
}
