import Link from "next/link";
import { homePreviews, previewCta } from "@/data/site-content";
import Reveal from "@/components/Reveal";

export default function HomePreviews() {
  return (
    <section className="bg-soft-white">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-6 py-20 sm:py-28 md:grid-cols-2">
        {homePreviews.map((preview, index) => (
          <Reveal key={preview.href} delay={index * 100}>
            <article className="group relative flex h-full flex-col border border-ink/10 p-8 transition-colors hover:border-muted-brass sm:p-10">
              <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
                {preview.eyebrow}
              </p>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {preview.title}
              </h3>
              {preview.excerpt && (
                <p className="mt-4 text-base leading-relaxed text-ink/80">
                  {preview.excerpt}
                </p>
              )}
              <Link
                href={preview.href}
                className="mt-8 self-start border-b border-muted-brass/60 text-sm font-medium tracking-[0.05em] text-ink transition-colors after:absolute after:inset-0 group-hover:text-muted-brass"
              >
                {previewCta}
                <span className="sr-only"> – {preview.title}</span>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
