import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/site-content";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-midnight">
      <Image
        src="/images/hero-footer.jpg"
        alt="비추는 교회 예배팀이 회중과 함께 찬양하는 모습"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_40%] md:object-[center_35%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(5, 11, 14, 0.4), rgba(5, 11, 14, 0.7))",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 pb-20 pt-40 sm:pb-24">
        <p className="hero-reveal hero-reveal-1 text-xs font-medium tracking-[0.3em] text-muted-brass">
          {hero.eyebrow}
        </p>

        <h1 className="hero-reveal hero-reveal-2 mt-5 font-display text-5xl leading-[1.05] font-semibold text-soft-white sm:text-6xl md:text-7xl">
          {hero.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-reveal hero-reveal-3 mt-6 max-w-xl text-base text-soft-white/90 sm:text-lg">
          {hero.koreanSubhead}
        </p>

        <div className="hero-reveal hero-reveal-4">
          <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/20 pt-6 text-soft-white/90">
            <span className="text-xs font-medium tracking-[0.2em] text-muted-brass">
              {hero.serviceLabel}
            </span>
            <span className="text-sm">{hero.serviceTime}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primaryCta.href}
              className="border border-soft-white bg-soft-white px-7 py-3 text-sm font-medium tracking-[0.08em] text-midnight transition-colors hover:bg-transparent hover:text-soft-white"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="border border-soft-white/60 px-7 py-3 text-sm font-medium tracking-[0.08em] text-soft-white transition-colors hover:border-muted-brass hover:text-muted-brass"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
