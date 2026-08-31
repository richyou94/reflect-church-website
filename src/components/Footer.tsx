import Image from "next/image";
import { footer, navLinks, siteLinks } from "@/data/site-content";
import Reveal from "@/components/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-midnight">
      <Image
        src="/images/hero-footer.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[38%_40%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(5, 11, 14, 0.82), rgba(5, 11, 14, 0.96))",
        }}
      />

      <Reveal className="relative mx-auto max-w-[1240px] px-6 py-16 sm:py-20">
        <Image
          src="/logos/reflect-wordmark-white.svg"
          alt="Reflect Church"
          width={160}
          height={35}
          className="h-7 w-auto"
        />
        <p className="mt-4 font-display text-xl font-semibold tracking-wide text-soft-white sm:text-2xl">
          {footer.tagline}
        </p>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
              {footer.sundayWorship.label}
            </p>
            <p className="mt-2 text-sm text-soft-white/80">{footer.sundayWorship.value}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
              {footer.prayerRoom.label}
            </p>
            <p className="mt-2 text-sm text-soft-white/80">{footer.prayerRoom.value}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">
              {footer.nightWorship.label}
            </p>
            <p className="mt-2 text-sm text-soft-white/80">{footer.nightWorship.value}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-brass">CONTACT</p>
            <p className="mt-2 text-sm text-soft-white/80">{siteLinks.address}</p>
            <a
              href={`mailto:${siteLinks.email}`}
              className="mt-1 block text-sm text-soft-white/80 transition-colors hover:text-muted-brass"
            >
              {siteLinks.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.15em] text-soft-white/80 transition-colors hover:text-muted-brass"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-x-6 text-xs font-medium tracking-[0.15em]">
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-white/80 transition-colors hover:text-muted-brass"
            >
              INSTAGRAM
            </a>
            <a
              href={siteLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-white/80 transition-colors hover:text-muted-brass"
            >
              YOUTUBE
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-soft-white/50">
          © {year} Reflect Church. All rights reserved.
        </p>
      </Reveal>
    </footer>
  );
}
