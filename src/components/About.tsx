import { about } from "@/data/site-content";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="bg-soft-white">
      <div className="mx-auto max-w-[1240px] px-6 pb-20 pt-32 sm:pb-28 sm:pt-36">
        <Reveal>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {about.heading}
          </h1>
        </Reveal>

        <Reveal delay={100} className="mt-4">
          <p className="max-w-3xl text-lg leading-relaxed text-ink/80 sm:text-xl">
            {about.statement}
          </p>
        </Reveal>

        <Reveal
          delay={200}
          className="mt-16 grid gap-10 border-t border-ink/10 pt-10 sm:mt-20 sm:grid-cols-[160px_1fr] sm:gap-16"
        >
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {about.missionHeading}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
            {about.missionStatement}
          </p>
        </Reveal>

        <div className="mt-16 border-t border-ink/10 pt-10 sm:mt-20 sm:pt-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {about.visionHeading}
          </h2>

          <ol className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">
            {about.visionItems.map((item, index) => (
              <li key={item.number}>
                <Reveal
                  delay={index * 100}
                  className="grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-[100px_1fr] sm:gap-10"
                >
                  <span className="font-display text-4xl font-semibold text-muted-brass sm:text-5xl">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-ink sm:text-xl">
                      {item.heading}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/80">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
