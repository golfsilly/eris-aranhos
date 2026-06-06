import { USER_ROLE } from "@/constants/roles";
import { requireSession } from "@/lib/session";

interface NurseStationLayoutProps {
  children: React.ReactNode;
}

export default async function NurseStationLayout({ children }: NurseStationLayoutProps) {
  await requireSession([USER_ROLE.ADMIN, USER_ROLE.DOCTOR, USER_ROLE.NURSE]);
  return <>{children}</>;
}
