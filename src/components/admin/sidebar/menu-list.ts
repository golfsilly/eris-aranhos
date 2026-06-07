import type { Route } from "next";
import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  Settings,
  UserCog2,
  TextInitial,
  HeartPulse,
  ImagePlay,
  MonitorPlay,
  SquarePlay,
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
          icon: SquarePlay,
          items: [
            {
              title: "Footer",
              url: "/admin/settings/footer-message",
              icon: TextInitial,
            },
            {
              title: "CPR",
              url: "/admin/settings/media-panel/cpr",
              icon: HeartPulse,
            },
            {
              title: "Carousel",
              url: "/admin/settings/media-panel/carousel",
              icon: ImagePlay,
            },
            {
              title: "Youtube",
              url: "/admin/settings/media-panel/youtube",
              icon: MonitorPlay,
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
