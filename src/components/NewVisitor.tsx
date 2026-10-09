import { newVisitor } from "@/data/site-content";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

type HeadingProps = {
  /** Page-title sections render their heading as the page's single h1. */
  as?: "h1" | "h2";
};

export default function NewVisitor({ as: Heading = "h2" }: HeadingProps) {
  const { directions } = newVisitor;

  return (
    <section id="new" className="bg-soft-white">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
            {newVisitor.eyebrow}
          </p>
          <Heading className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {newVisitor.heading}
          </Heading>

          <div className="mt-8 max-w-2xl space-y-5 border-t border-ink/10 pt-8">
            {newVisitor.intro.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink/80">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <div id="directions" className="mt-16 grid gap-10 border-t border-ink/10 pt-10 sm:mt-20 sm:pt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {directions.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink">
              {directions.address}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              {directions.driving}
            </p>

            <div className="mt-8 border-l border-muted-brass/50 pl-5">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
                PARKING
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink">
                {directions.parking}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
              대중교통
            </p>
            <ul className="mt-4 space-y-6">
              {directions.transit.map((route) => (
                <li key={route.routes} className="border-l border-ink/10 pl-5">
                  <p className="text-base font-medium text-ink">{route.routes}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {route.detail}
                  </p>
                  <p className="mt-1 text-sm text-stone">{route.stopNumbers}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-16 border-t border-ink/10 pt-10 sm:mt-20 sm:pt-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            FAQ
          </h2>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
