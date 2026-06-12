import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { getPreference } from "@/server/server-actions";
import {
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
} from "@/lib/preferences/layout";
import { auth } from "@/lib/auth";
import { requireStaff } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

interface LayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: Readonly<LayoutProps>) {
  // await requireStaff();

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [variant, collapsible] = await Promise.all([
    getPreference("sidebar_variant", SIDEBAR_VARIANT_VALUES, "inset"),
    getPreference("sidebar_collapsible", SIDEBAR_COLLAPSIBLE_VALUES, "icon"),
  ]);

  return (
    <DashboardShell
      defaultOpen={defaultOpen}
      variant={variant}
      collapsible={collapsible}
      session={session}
    >
      {children}
    </DashboardShell>
  );
}
