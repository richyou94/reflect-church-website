type PageHeadingProps = {
  title: string;
};

// Compact internal-page heading. Sits under the fixed header on the same dark
// background, so the header is readable immediately on load.
export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <section className="bg-midnight">
      <div className="mx-auto max-w-[1240px] px-6 pb-12 pt-32 sm:pb-14 sm:pt-36">
        <h1 className="hero-reveal hero-reveal-1 font-display text-4xl font-semibold leading-tight text-soft-white sm:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
