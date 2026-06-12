import { requireStaff } from "@/lib/session";

interface QueueScreenLayoutProps {
  children: React.ReactNode;
}

export default async function QueueScreenLayout({
  children,
}: QueueScreenLayoutProps) {
  await requireStaff;
  return <>{children}</>;
}
