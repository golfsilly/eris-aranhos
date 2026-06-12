import { requireStaff } from "@/lib/session";

interface StaffStationLayoutProps {
  children: React.ReactNode;
}

export default async function StaffStationLayout({
  children,
}: StaffStationLayoutProps) {
  await requireStaff;
  return <>{children}</>;
}
