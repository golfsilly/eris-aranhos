import { requireDOCTOR } from "@/lib/session";

interface DoctorStationLayoutProps {
  children: React.ReactNode;
}

export default async function DoctorStationLayout({
  children,
}: DoctorStationLayoutProps) {
  await requireDOCTOR;
  return <>{children}</>;
}
