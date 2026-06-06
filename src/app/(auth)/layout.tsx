import { requireGuest } from "@/lib/session";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await requireGuest();

  return <main>{children}</main>;
}
