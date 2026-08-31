import { welcome } from "@/data/site-content";
import Reveal from "@/components/Reveal";

export default function Welcome() {
  return (
    <section className="bg-warm-ivory">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
            {welcome.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {welcome.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            {welcome.body}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-14 grid gap-10 border-t border-ink/10 pt-10 sm:grid-cols-3">
            {welcome.details.map((detail) => (
              <div key={detail.label} className="border-l border-muted-brass/50 pl-5">
                <dt className="text-xs font-medium tracking-[0.2em] text-muted-brass">
                  {detail.label}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-ink">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
