import { messages } from "@/data/site-content";
import Reveal from "@/components/Reveal";
import VideoSection from "@/components/VideoSection";
import { getLatestPlaylistVideos } from "@/lib/youtube";

type HeadingProps = {
  /** Page-title sections render their heading as the page's single h1. */
  as?: "h1" | "h2";
};

export default async function Messages({ as: Heading = "h2" }: HeadingProps) {
  const [sermons, worship] = await Promise.all([
    getLatestPlaylistVideos(messages.playlists.sermons.playlistId),
    getLatestPlaylistVideos(messages.playlists.worship.playlistId),
  ]);

  return (
    <section id="messages" className="bg-midnight">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
            {messages.eyebrow}
          </p>
          <Heading className="mt-5 font-display text-3xl font-semibold text-soft-white sm:text-4xl">
            {messages.heading}
          </Heading>
        </Reveal>

        <div className="divide-y divide-white/10">
          <VideoSection
            koreanLabel={messages.playlists.sermons.koreanLabel}
            heading={messages.playlists.sermons.heading}
            playlistUrl={messages.playlists.sermons.playlistUrl}
            ctaLabel={messages.playlists.sermons.ctaLabel}
            ctaAriaLabel={messages.playlists.sermons.ctaAriaLabel}
            result={sermons}
            unavailableMessage={messages.unavailableMessage}
            delay={100}
            priorityFirstCard
            cardAriaSuffix={messages.videoModal.cardAriaSuffix}
            watchOnYoutubeLabel={messages.videoModal.watchOnYoutubeLabel}
            modalCloseLabel={messages.videoModal.closeLabel}
            modalPreviousLabel={messages.videoModal.previousLabel}
            modalNextLabel={messages.videoModal.nextLabel}
          />
          <VideoSection
            koreanLabel={messages.playlists.worship.koreanLabel}
            heading={messages.playlists.worship.heading}
            playlistUrl={messages.playlists.worship.playlistUrl}
            ctaLabel={messages.playlists.worship.ctaLabel}
            ctaAriaLabel={messages.playlists.worship.ctaAriaLabel}
            result={worship}
            unavailableMessage={messages.unavailableMessage}
            cardAriaSuffix={messages.videoModal.cardAriaSuffix}
            watchOnYoutubeLabel={messages.videoModal.watchOnYoutubeLabel}
            modalCloseLabel={messages.videoModal.closeLabel}
            modalPreviousLabel={messages.videoModal.previousLabel}
            modalNextLabel={messages.videoModal.nextLabel}
          />
        </div>
      </div>
    </section>
  );
}
