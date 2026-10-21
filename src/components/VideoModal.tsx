"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { YoutubeVideo } from "@/lib/youtube";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])';

type VideoModalProps = {
  video: YoutubeVideo;
  hasMultiple: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  watchOnYoutubeLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export default function VideoModal({
  video,
  hasMultiple,
  onClose,
  onPrevious,
  onNext,
  watchOnYoutubeLabel,
  closeLabel,
  previousLabel,
  nextLabel,
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  // Drives the entrance transition only; exit has no animation since the
  // modal unmounts immediately (which also stops iframe playback).
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Moves focus into the dialog on open, and again whenever the video
  // changes via the arrows, so focus never drifts into stale content.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [video.id]);

  // Locks page scroll while the modal is mounted; restores on close.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Escape closes, ArrowLeft/ArrowRight navigate, Tab is trapped inside.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (hasMultiple && event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (hasMultiple && event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key === "Tab") {
        const container = dialogRef.current;
        if (!container) return;

        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasMultiple, onClose, onPrevious, onNext]);

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    // Only the backdrop itself (not a bubbled click from inside the dialog)
    // should close the modal.
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  // Rendered through a portal straight into <body> so the fixed-position
  // backdrop always paints above everything else, regardless of whether an
  // ancestor (e.g. a Reveal wrapper mid-transition) creates its own
  // stacking context.
  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-midnight/90 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-6xl transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black">
          <iframe
            key={video.id}
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-soft-white/40 bg-midnight/70 text-soft-white transition-colors hover:border-muted-brass hover:text-muted-brass sm:right-3 sm:top-3"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {hasMultiple && (
            <button
              type="button"
              onClick={onPrevious}
              aria-label={previousLabel}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-soft-white/40 bg-midnight/70 text-soft-white transition-colors hover:border-muted-brass hover:text-muted-brass sm:left-3"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {hasMultiple && (
            <button
              type="button"
              onClick={onNext}
              aria-label={nextLabel}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-soft-white/40 bg-midnight/70 text-soft-white transition-colors hover:border-muted-brass hover:text-muted-brass sm:right-3"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-xl font-semibold text-soft-white sm:text-2xl">
            {video.title}
          </h2>
          <a
            href={video.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border border-muted-brass px-5 py-2.5 text-sm font-medium tracking-[0.08em] text-soft-white transition-colors hover:bg-muted-brass hover:text-midnight"
          >
            {watchOnYoutubeLabel}
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
