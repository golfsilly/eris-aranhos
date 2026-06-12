import { requireNurse } from "@/lib/session";

interface NurseStationLayoutProps {
  children: React.ReactNode;
}

export default async function NurseStationLayout({
  children,
}: NurseStationLayoutProps) {
  await requireNurse();
  return <>{children}</>;
}
