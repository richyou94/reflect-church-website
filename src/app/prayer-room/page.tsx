import PrayerRoom from "@/components/PrayerRoom";
import { pageMeta } from "@/data/site-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(pageMeta.prayerRoom);

export default function PrayerRoomPage() {
  return (
    <div className="pt-[4.5rem]">
      <PrayerRoom as="h1" />
    </div>
  );
}
