import Image from "next/image";
import Link from "next/link";
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
          src="/logos/reflect-logo-horizontal-white.png"
          alt="Reflect Church"
          width={1500}
          height={300}
          className="h-8 w-auto object-contain sm:h-10"
        />
        <p className="mt-4 font-display text-xl font-semibold tracking-wide text-soft-white sm:text-2xl">
          {footer.tagline}
        </p>

        <div className="mt-12 border-t border-white/10 pt-10">
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
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.15em] text-soft-white/80 transition-colors hover:text-muted-brass"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-x-3">
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reflect Church Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full text-soft-white/80 transition-colors hover:text-muted-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-brass focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.6] sm:h-[30px] sm:w-[30px]">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={siteLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reflect Church YouTube"
              className="flex h-12 w-12 items-center justify-center rounded-full text-soft-white/80 transition-colors hover:text-muted-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-brass focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-[1.6] sm:h-[30px] sm:w-[30px]">
                <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                <path d="M10.5 9.3l5 2.7-5 2.7z" fill="currentColor" stroke="none" />
              </svg>
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
