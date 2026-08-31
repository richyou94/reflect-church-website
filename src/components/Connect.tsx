"use client";

import { useState, type FormEvent } from "react";
import { connect, siteLinks } from "@/data/site-content";
import Reveal from "@/components/Reveal";

export default function Connect() {
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent any submission until the pastor confirms a delivery method
    // (e.g. Formspree, Resend, or a custom API route). No data is sent yet.
    event.preventDefault();
  };

  return (
    <section id="connect" className="bg-warm-ivory">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-muted-brass">
            CONNECT
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {connect.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80">
            {connect.body}
          </p>
        </Reveal>

        <Reveal delay={100}>
        <form
          onSubmit={handleSubmit}
          className="mt-12 grid max-w-2xl gap-6 border-t border-ink/10 pt-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-xs font-medium tracking-[0.15em] text-muted-brass">
                성함
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 w-full border border-ink/20 bg-transparent px-3 py-2.5 text-base text-ink outline-none focus-visible:border-muted-brass"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-medium tracking-[0.15em] text-muted-brass">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full border border-ink/20 bg-transparent px-3 py-2.5 text-base text-ink outline-none focus-visible:border-muted-brass"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="text-xs font-medium tracking-[0.15em] text-muted-brass">
              제목
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="mt-2 w-full border border-ink/20 bg-transparent px-3 py-2.5 text-base text-ink outline-none focus-visible:border-muted-brass"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-xs font-medium tracking-[0.15em] text-muted-brass">
              내용
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-2 w-full border border-ink/20 bg-transparent px-3 py-2.5 text-base text-ink outline-none focus-visible:border-muted-brass"
            />
          </div>

          <label htmlFor="consent" className="flex items-start gap-3 text-sm text-ink/80">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={consentChecked}
              onChange={(event) => setConsentChecked(event.target.checked)}
              required
              className="mt-1 h-4 w-4 shrink-0 border-ink/30 accent-[var(--muted-brass)]"
            />
            <span>개인정보 수집 및 이용에 동의합니다.</span>
          </label>

          <button
            type="submit"
            disabled={!consentChecked}
            className="mt-2 w-full border border-muted-brass bg-midnight px-7 py-3 text-sm font-medium tracking-[0.08em] text-soft-white transition-colors hover:bg-muted-brass hover:text-midnight disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-midnight disabled:hover:text-soft-white sm:w-auto"
          >
            제출하기
          </button>
        </form>
        </Reveal>

        <p className="mt-10 text-sm text-ink/70">
          바로 문의하시려면{" "}
          <a
            href={`mailto:${siteLinks.email}`}
            className="border-b border-muted-brass/60 font-medium text-ink transition-colors hover:text-muted-brass"
          >
            {siteLinks.email}
          </a>
          {" "}로 이메일을 보내 주세요.
        </p>
      </div>
    </section>
  );
}
