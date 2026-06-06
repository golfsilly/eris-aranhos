import { USER_ROLE } from "@/constants/roles";
import { requireSession } from "@/lib/session";

interface StaffStationLayoutProps {
  children: React.ReactNode;
}

export default async function StaffStationLayout({ children }: StaffStationLayoutProps) {
  await requireSession([USER_ROLE.ADMIN, USER_ROLE.DOCTOR, USER_ROLE.NURSE, USER_ROLE.STAFF]);
  return <>{children}</>;
}
