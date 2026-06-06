import { USER_ROLE } from "@/constants/roles";
import { requireSession } from "@/lib/session";

interface DoctorStationLayoutProps {
  children: React.ReactNode;
}

export default async function DoctorStationLayout({ children }: DoctorStationLayoutProps) {
  await requireSession([USER_ROLE.ADMIN, USER_ROLE.DOCTOR]);
  return <>{children}</>;
}
