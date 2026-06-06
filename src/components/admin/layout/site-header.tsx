"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { UserProfileButton } from "@/components/profile-button";
import {
  SearchTrigger,
  CommandSearch,
} from "@/components/admin/sidebar/command-search";
import { SidebarTrigger } from "@/components/admin/ui/sidebar";
import { LayoutControls } from "@/components/admin/layout/layout-controls";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

type ClientSession = ReturnType<typeof authClient.useSession>["data"];

interface DashboardSiteHeaderProps {
  session: ClientSession; 
}

export function AdminSiteHeader({ session }: DashboardSiteHeaderProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || e.key === "/") {
        e.preventDefault();
        setSearchOpen(true);
      }

      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", down);

    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
        "[html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-50 [html[data-navbar-style=sticky]_&]:overflow-hidden [html[data-navbar-style=sticky]_&]:rounded-t-[inherit] [html[data-navbar-style=sticky]_&]:bg-background/50 [html[data-navbar-style=sticky]_&]:backdrop-blur-md",
      )}
    >
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-1 h-4 data-[orientation=vertical]:h-4" />
          <SearchTrigger onClick={() => setSearchOpen(true)} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LayoutControls />
          <ModeToggle />
          <UserProfileButton initialSession={session} />
        </div>
      </div>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
