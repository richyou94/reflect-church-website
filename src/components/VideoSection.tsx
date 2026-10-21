import Reveal from "@/components/Reveal";
import VideoGallery from "@/components/VideoGallery";
import type { PlaylistVideosResult } from "@/lib/youtube";

type VideoSectionProps = {
  koreanLabel: string;
  heading: string;
  playlistUrl: string;
  ctaLabel: string;
  ctaAriaLabel: string;
  result: PlaylistVideosResult;
  unavailableMessage: string;
  /** Stagger delay in milliseconds for this section's Reveal transitions. */
  delay?: number;
  /** Marks this section's first card for faster LCP (top, above-the-fold section only). */
  priorityFirstCard?: boolean;
  cardAriaSuffix: string;
  watchOnYoutubeLabel: string;
  modalCloseLabel: string;
  modalPreviousLabel: string;
  modalNextLabel: string;
};

export default function VideoSection({
  koreanLabel,
  heading,
  playlistUrl,
  ctaLabel,
  ctaAriaLabel,
  result,
  unavailableMessage,
  delay = 0,
  priorityFirstCard = false,
  cardAriaSuffix,
  watchOnYoutubeLabel,
  modalCloseLabel,
  modalPreviousLabel,
  modalNextLabel,
}: VideoSectionProps) {
  const videos = result.ok ? result.videos : [];

  return (
    <div className="py-16 sm:py-20">
      <Reveal delay={delay}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">{koreanLabel}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-soft-white sm:text-4xl">
              {heading}
            </h2>
          </div>
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ctaAriaLabel}
            className="inline-block shrink-0 border border-muted-brass px-6 py-3 text-sm font-medium tracking-[0.08em] text-soft-white transition-colors hover:bg-muted-brass hover:text-midnight"
          >
            {ctaLabel}
          </a>
        </div>
      </Reveal>

      <Reveal delay={delay + 100} className="mt-10">
        {videos.length > 0 ? (
          <VideoGallery
            videos={videos}
            priorityFirstCard={priorityFirstCard}
            cardAriaSuffix={cardAriaSuffix}
            watchOnYoutubeLabel={watchOnYoutubeLabel}
            closeLabel={modalCloseLabel}
            previousLabel={modalPreviousLabel}
            nextLabel={modalNextLabel}
          />
        ) : (
          <p className="max-w-xl text-base leading-relaxed text-stone">{unavailableMessage}</p>
        )}
      </Reveal>
    </div>
  );
}
