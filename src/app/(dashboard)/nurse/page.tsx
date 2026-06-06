import { genPageMetadata } from "@/app/seo";
import NurseStation from "./_components/nurse-station";

export const metadata = genPageMetadata({ title: "Nurse Station" });

export default function NurseStationPage() {
  return (
    <>
      <NurseStation />
    </>
  );
}
