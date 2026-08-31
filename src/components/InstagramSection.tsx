import { instagram, siteLinks } from "@/data/site-content";
import Reveal from "@/components/Reveal";

export default function InstagramSection() {
  return (
    <section className="bg-deep-teal">
      <Reveal className="mx-auto max-w-[1240px] px-6 py-20 text-center sm:py-28">
        <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
          {instagram.eyebrow}
        </p>
        <h2 className="mt-5 font-display text-3xl font-semibold text-soft-white sm:text-4xl">
          {instagram.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-soft-white/80">
          일상 속 예배와 공동체의 순간들을 인스타그램에서 만나 보세요.
        </p>

        {/*
          Future approved gallery: once a curated set of Instagram images is
          approved, render them here (e.g. a grid of next/image thumbnails)
          in place of this call-to-action.
        */}

        <a
          href={siteLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-muted-brass px-7 py-3 text-sm font-medium tracking-[0.08em] text-soft-white transition-colors hover:bg-muted-brass hover:text-midnight"
        >
          인스타그램에서 보기
        </a>
      </Reveal>
    </section>
  );
}
