import PageHeading from "@/components/PageHeading";
import About from "@/components/About";
import { pageMeta } from "@/data/site-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(pageMeta.about);

export default function AboutPage() {
  return (
    <>
      <PageHeading title={pageMeta.about.title} />
      <About />
    </>
  );
}
