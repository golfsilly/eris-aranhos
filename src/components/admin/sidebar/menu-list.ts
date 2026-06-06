import type { Route } from "next";
import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  Settings,
  HeartPlus,
  UserCog2,
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: Route;
  icon?: LucideIcon;
  badge?: string;
  isActive?: boolean;
  items?: MenuItem[];
}

export interface MenuGroup {
  label: string;
  badge?: string;
  items: MenuItem[];
}

export const MenuAdminList: {
  navGroups: MenuGroup[];
} = {
  navGroups: [
    {
      label: "Dashboards",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Administration",
      items: [
        {
          title: "Media Panel",
          url: "/admin/settings/media-panel",
          icon: Settings,
          items: [
            {
              title: "CPR Settings",
              url: "/admin/settings/media-panel/cpr",
              icon: HeartPlus,
            },
            {
              title: "Carousel Settings",
              url: "/admin/settings/media-panel/carousel",
              icon: HeartPlus,
            },
            {
              title: "Youtube Settings",
              url: "/admin/settings/media-panel/youtube",
              icon: HeartPlus,
            },
          ],
        },
        {
          title: "Settings",
          url: "/admin/settings",
          icon: Settings,
          items: [
            {
              title: "User Settings",
              url: "/admin/management/users",
              icon: UserCog2,
            },
          ],
        },
      ],
    },
  ],
};
