import { genPageMetadata } from "@/app/seo";
import QueueDashboard from "./_components/QueueDashboard";

export const metadata = genPageMetadata({ title: "ระบบคิวห้องฉุกเฉิน" });

export default function page() {
  return (
    <QueueDashboard />
  )
}
