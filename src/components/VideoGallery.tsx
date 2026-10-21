"use client";

import { useRef, useState } from "react";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import type { YoutubeVideo } from "@/lib/youtube";

type VideoGalleryProps = {
  /** Already-fetched, serializable videos from the server — never refetched
   * in the browser and never carries the YouTube API key. */
  videos: YoutubeVideo[];
  priorityFirstCard?: boolean;
  cardAriaSuffix: string;
  watchOnYoutubeLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export default function VideoGallery({
  videos,
  priorityFirstCard = false,
  cardAriaSuffix,
  watchOnYoutubeLabel,
  closeLabel,
  previousLabel,
  nextLabel,
}: VideoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const total = videos.length;
  const hasMultiple = total > 1;

  function goTo(index: number) {
    if (total === 0) return;
    setActiveIndex(((index % total) + total) % total);
  }

  function handleClose() {
    const indexToRefocus = activeIndex;
    setActiveIndex(null);
    if (indexToRefocus !== null) {
      // Returns focus to the card that opened the modal.
      triggerRefs.current[indexToRefocus]?.focus();
    }
  }

  function handlePrevious() {
    if (activeIndex === null) return;
    goTo(activeIndex - 1);
  }

  function handleNext() {
    if (activeIndex === null) return;
    goTo(activeIndex + 1);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            priority={priorityFirstCard && index === 0}
            ariaSuffix={cardAriaSuffix}
            onOpen={() => setActiveIndex(index)}
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <VideoModal
          video={videos[activeIndex]}
          hasMultiple={hasMultiple}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          watchOnYoutubeLabel={watchOnYoutubeLabel}
          closeLabel={closeLabel}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
        />
      )}
    </>
  );
}
