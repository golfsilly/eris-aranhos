import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";
import { DashboardSiteHeader } from "./layout/site-header";
import { DashboardSiteFooter } from "./layout/site-footer";
import { authClient } from "@/lib/auth-client"; 

type ClientSession = ReturnType<typeof authClient.useSession>["data"];

interface DashboardShellProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant: "sidebar" | "floating" | "inset";
  collapsible: "offcanvas" | "icon" | "none";
  session: ClientSession; 
}

export function DashboardShell({
  children,
  defaultOpen,
  variant,
  collapsible,
  session, 
}: DashboardShellProps) {
  return (
    <SidebarProvider
       {...(defaultOpen !== undefined && { defaultOpen })}
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant={variant}
        collapsible={collapsible}
      />

      <SidebarInset
        className={cn(
          "peer-data-[variant=inset]:border",
          "[--dashboard-header-height:--spacing(12)]"
        )}
      >
        <DashboardSiteHeader session={session} />

        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>

        <DashboardSiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}