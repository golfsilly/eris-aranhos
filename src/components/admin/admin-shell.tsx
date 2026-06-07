import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { AppSidebar } from "./sidebar/app-sidebar";
import { AdminSiteHeader } from "./layout/site-header";
import { AdminSiteFooter } from "./layout/site-footer";
import { authClient } from "@/lib/auth-client";

type ClientSession = ReturnType<typeof authClient.useSession>["data"];

interface AdminShellProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant: "sidebar" | "floating" | "inset";
  collapsible: "offcanvas" | "icon" | "none";
  session: ClientSession;
}

export function AdminShell({
  children,
  defaultOpen,
  variant,
  collapsible,
  session,
}: AdminShellProps) {
  return (
    <SidebarConfigProvider>
      <SidebarProvider
        {...(defaultOpen !== undefined && { defaultOpen })}
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "3rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant={variant} collapsible={collapsible} />

        <SidebarInset
          className={cn(
            "peer-data-[variant=inset]:border",
            "[--dashboard-header-height:--spacing(12)]",
          )}
        >
          <AdminSiteHeader session={session} />

          <main className="flex-1 p-4 md:p-6">{children}</main>

          <AdminSiteFooter />
        </SidebarInset>
      </SidebarProvider>
    </SidebarConfigProvider>
  );
}
