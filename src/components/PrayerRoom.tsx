import Image from "next/image";
import { prayerRoom, siteLinks } from "@/data/site-content";
import Reveal from "@/components/Reveal";

type HeadingProps = {
  /** Page-title sections render their heading as the page's single h1. */
  as?: "h1" | "h2";
};

export default function PrayerRoom({ as: Heading = "h2" }: HeadingProps) {
  return (
    <section id="prayer-room" className="bg-warm-ivory">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-[560px]">
          <Image
            src="/images/prayer-house.jpg"
            alt="비추는 교회 기도실에서 찬양팀이 함께 모여 예배하는 모습"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
            {prayerRoom.eyebrow}
          </p>
          <Heading className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {prayerRoom.heading}
          </Heading>
          <p className="mt-2 text-sm font-medium tracking-[0.1em] text-muted-brass">
            {prayerRoom.reference}
          </p>

          <div className="mt-6 space-y-4">
            {prayerRoom.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
            {prayerRoom.schedules.map((schedule) => (
              <div key={schedule.label}>
                <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
                  {schedule.label}
                </p>
                {schedule.lines.map((line) => (
                  <p key={line} className="mt-2 text-base leading-relaxed text-ink">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm leading-relaxed text-ink/70">
            {prayerRoom.additionalInfo}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium tracking-[0.05em]">
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-muted-brass/60 text-ink transition-colors hover:text-muted-brass"
            >
              인스타그램 메시지
            </a>
            <a
              href={`mailto:${siteLinks.email}`}
              className="border-b border-muted-brass/60 text-ink transition-colors hover:text-muted-brass"
            >
              {siteLinks.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
