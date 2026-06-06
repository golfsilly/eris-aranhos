import { genPageMetadata } from "@/app/seo";
import QueueDashboard from "./_components/QueueDashboard";
import QueueDashboard2 from "./_components/QueueDashboard2";
import QueueDashboard3 from "./_components/QueueDashboard3";

export const metadata = genPageMetadata({ title: "ระบบคิวห้องฉุกเฉิน" });

export default function page() {
  return (
    // <QueueDashboard />
    <QueueDashboard2 />
    // <QueueDashboard3 />
  )
}
