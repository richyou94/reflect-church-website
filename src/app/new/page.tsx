import NewVisitor from "@/components/NewVisitor";
import { pageMeta } from "@/data/site-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(pageMeta.new);

export default function NewPage() {
  return (
    <div className="pt-[4.5rem]">
      <NewVisitor as="h1" />
    </div>
  );
}
