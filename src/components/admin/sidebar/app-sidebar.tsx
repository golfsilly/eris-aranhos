"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import * as React from "react";
import { SidebarContext } from "@/contexts/sidebar-context";
import { MenuAdminList } from "./menu-list";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const ctx = React.useContext(SidebarContext);

  const [variant, setVariant] = React.useState(() => props.variant);
  const [collapsible, setCollapsible] = React.useState(() => props.collapsible);

  React.useEffect(() => {
    if (!ctx?.config) return;
    // Schedule updates asynchronously to avoid synchronous setState inside effect
    const t = setTimeout(() => {
      setVariant(ctx.config.variant ?? props.variant);
      setCollapsible(ctx.config.collapsible ?? props.collapsible);
    }, 0);
    return () => clearTimeout(t);
  }, [ctx?.config, props.variant, props.collapsible]);

  return (
    <Sidebar
      {...(variant ? { variant } : {})}
      {...(collapsible ? { collapsible } : {})}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo-aranhos.png"
                  alt="ERIS"
                  width={42}
                  height={42}
                  className="rounded-lg w-12 h-12 object-contain"
                />

                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-tight text-primary">
                    ERIS
                  </span>
                  <span className="font-medium text-xs text-muted-foreground">
                    โรงพยาบาลอรัญประเทศ
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {MenuAdminList.navGroups.map((group) => (
          <NavMain
            key={group.label}
            label={group.label}
            items={group.items}
            {...(group.badge ? { badge: group.badge } : {})}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
