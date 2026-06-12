import { genPageMetadata } from "@/app/seo";
import QueueScreen from "./_components/queue-screen";

export const metadata = genPageMetadata({ title: "Queue Screen" });

export default function QueueScreenPage() {
  return (
    <>
      <QueueScreen />
    </>
  );
}
