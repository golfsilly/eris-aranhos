import type { Route } from "next";
import type { LucideIcon } from "lucide-react";

import {
  LayoutPanelLeft,
  LayoutDashboard,
  Tv,
  Tv2,
  HeartPlus,
  BriefcaseMedical,
  UserCog2,
  TvMinimal,
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

export const MenuDashboardList: {
  navGroups: MenuGroup[];
} = {
  navGroups: [
    {
      label: "Dashboards",
      items: [
        {
          title: "Dashboard 1",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Dashboard 2",
          url: "/dashboard2",
          icon: LayoutPanelLeft,
          badge: "Coming Soon",
        },
      ],
    },
    {
      label: "Application",
      items: [
        {
          title: "Staff Station",
          url: "/staff",
          icon: UserCog2,
        },
        {
          title: "Nurse Station",
          url: "/nurse",
          icon: HeartPlus,
        },
        {
          title: "Doctor Station",
          url: "/doctor",
          icon: BriefcaseMedical,
          badge: "Coming Soon",
        },
      ],
    },
    {
      label: "Display",
      items: [
        {
          title: "Display 1",
          url: "/monitor",
          icon: Tv,
        },
        {
          title: "Display 2",
          url: "/monitor2",
          icon: Tv2,
        },
        {
          title: "Display 3",
          url: "/monitor3",
          icon: TvMinimal,
          badge: "Coming Soon",
        },
      ],
    },
  ],
};
