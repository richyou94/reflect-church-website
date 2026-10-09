import { messages, siteLinks } from "@/data/site-content";
import Reveal from "@/components/Reveal";

type HeadingProps = {
  /** Page-title sections render their heading as the page's single h1. */
  as?: "h1" | "h2";
};

export default function Messages({ as: Heading = "h2" }: HeadingProps) {
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

        <Reveal delay={100} className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
          <div className="aspect-video w-full overflow-hidden border border-white/10">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${messages.videoId}`}
              title={`${messages.videoTitle} - ${messages.videoSubtitle}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
              {messages.videoSubtitle}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-soft-white">
              {messages.videoTitle}
            </h2>
            <a
              href={siteLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border border-muted-brass px-6 py-3 text-sm font-medium tracking-[0.08em] text-soft-white transition-colors hover:bg-muted-brass hover:text-midnight"
            >
              {messages.moreLink}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
