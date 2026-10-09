import Connect from "@/components/Connect";
import InstagramSection from "@/components/InstagramSection";
import { pageMeta } from "@/data/site-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(pageMeta.connect);

export default function ConnectPage() {
  return (
    <div className="pt-[4.5rem]">
      <Connect as="h1" />
      <InstagramSection />
    </div>
  );
}
