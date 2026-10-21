"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { YoutubeVideo } from "@/lib/youtube";

function formatPublishedDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

type VideoCardProps = {
  video: YoutubeVideo;
  /** Marks the first above-the-fold card per section for faster LCP. */
  priority?: boolean;
  /** Opens this video in the in-page modal. */
  onOpen: () => void;
  /** Suffix appended to the accessible label, e.g. "동영상 재생". */
  ariaSuffix: string;
};

// A plain <button> (not a link) so it never nests an interactive element
// inside another — the external YouTube link lives separately in the modal.
const VideoCard = forwardRef<HTMLButtonElement, VideoCardProps>(function VideoCard(
  { video, priority = false, onOpen, ariaSuffix },
  ref
) {
  const formattedDate = formatPublishedDate(video.publishedAt);

  return (
    <button
      type="button"
      ref={ref}
      onClick={onOpen}
      aria-label={`${video.title}${formattedDate ? ` (${formattedDate})` : ""} – ${ariaSuffix}`}
      className="group block w-full text-left"
    >
      <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black/40">
        <Image
          src={video.thumbnailUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-midnight/0 transition-colors duration-300 group-hover:bg-midnight/40">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-soft-white/70 bg-midnight/60 text-soft-white transition-transform duration-300 motion-safe:group-hover:scale-110">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>

      <h3 className="mt-4 line-clamp-2 font-display text-lg font-semibold leading-snug text-soft-white">
        {video.title}
      </h3>
      {formattedDate && <p className="mt-1 text-sm text-stone">{formattedDate}</p>}
    </button>
  );
});

export default VideoCard;
