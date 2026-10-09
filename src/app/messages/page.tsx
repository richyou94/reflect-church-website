import Messages from "@/components/Messages";
import { pageMeta } from "@/data/site-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(pageMeta.messages);

export default function MessagesPage() {
  return (
    <div className="bg-midnight pt-[4.5rem]">
      <Messages as="h1" />
    </div>
  );
}
