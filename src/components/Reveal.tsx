"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver() {
  if (typeof IntersectionObserver === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  return sharedObserver;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds, applied to the reveal transition only. */
  delay?: number;
};

// Reveals content once, on first scroll into view. The ".reveal" class is
// hidden by default in CSS; a <noscript> rule in the root layout forces it
// visible when JS is unavailable, so content never gets stuck hidden.
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = getSharedObserver();
    if (!observer) {
      // No IntersectionObserver support: reveal on the next tick instead of
      // synchronously, so this stays an async (subscription-style) update.
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }

    revealCallbacks.set(node, () => setVisible(true));
    observer.observe(node);

    return () => {
      observer.unobserve(node);
      revealCallbacks.delete(node);
    };
  }, []);

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={["reveal", visible ? "is-visible" : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

