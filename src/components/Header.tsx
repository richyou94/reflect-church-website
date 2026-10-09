"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteLinks, visitCta } from "@/data/site-content";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  // The menu is open only for the route it was opened on, so any route change
  // (link click, back/forward) closes it without an effect.
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const menuOpen = menuOpenPath === pathname;
  const closeMenu = () => setMenuOpenPath(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpenPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  // Only the homepage has a hero to sit transparently over; internal pages
  // always get the solid header so the white logo and links stay readable.
  const solid = !isHome || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-midnight/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0" aria-label="Reflect Church home" onClick={closeMenu}>
          <Image
            src="/logos/reflect-logo-horizontal-white.png"
            alt="Reflect Church"
            width={1500}
            height={300}
            priority
            className="hidden h-8 w-auto object-contain sm:h-9 md:block"
          />
          <Image
            src="/logos/reflect-logo-stacked-white.png"
            alt="Reflect Church"
            width={550}
            height={390}
            priority
            className="h-10 w-auto object-contain md:hidden"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`border-b pb-1 text-xs font-medium tracking-[0.18em] transition-colors hover:text-muted-brass ${
                isActive(link.href)
                  ? "border-muted-brass text-soft-white"
                  : "border-transparent text-soft-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={visitCta.href}
          className="hidden shrink-0 border border-muted-brass px-5 py-2 text-xs font-medium tracking-[0.18em] text-soft-white transition-colors hover:bg-muted-brass hover:text-midnight lg:inline-block"
        >
          {visitCta.label}
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpenPath(menuOpen ? null : pathname)}
          className="relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="sr-only">{menuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
          <span
            className={`h-px w-6 bg-soft-white transition-transform duration-200 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-soft-white transition-transform duration-200 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav
          className="flex flex-col gap-1 border-t border-white/10 bg-midnight px-6 py-4"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={closeMenu}
              className={`py-3 text-sm font-medium tracking-[0.14em] transition-colors hover:text-muted-brass ${
                isActive(link.href)
                  ? "text-soft-white underline decoration-muted-brass underline-offset-[10px]"
                  : "text-soft-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 text-sm font-medium tracking-[0.14em] text-muted-brass"
            onClick={closeMenu}
          >
            INSTAGRAM
          </a>
        </nav>
      </div>
    </header>
  );
}
