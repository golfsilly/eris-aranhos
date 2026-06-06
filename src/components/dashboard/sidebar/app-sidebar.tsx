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
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { MenuDashboardList } from "./menu-list";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
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
                  priority
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
        {MenuDashboardList.navGroups.map((group) => (
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
