import type { Metadata } from "next";

// A page's openGraph object replaces the root one entirely, so locale and type
// are repeated here to keep the global Open Graph configuration intact.
export function pageMetadata({
  title,
  description,
}: {
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Reflect Church`,
      description,
      locale: "ko_KR",
      type: "website",
    },
  };
}
