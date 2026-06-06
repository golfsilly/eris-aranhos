import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import { MenuDashboardList } from "@/components/dashboard/sidebar/menu-list";
import { MenuAdminList } from "@/components/admin/sidebar/menu-list";

export interface SearchItem {
  title: string;
  url: Route;
  group: string;
  icon?: LucideIcon;
}

function createSearchItem(
  title: string,
  url: Route,
  group: string,
  icon?: LucideIcon
): SearchItem {
  return {
    title,
    url,
    group,
    ...(icon ? { icon } : {}),
  };
}

export function getSearchDashboardItems(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const group of MenuDashboardList.navGroups) {
    for (const item of group.items) {
      items.push(
        createSearchItem(
          item.title,
          item.url,
          group.label,
          item.icon
        )
      );

      if (item.items?.length) {
        for (const subItem of item.items) {
          items.push(
            createSearchItem(
              subItem.title,
              subItem.url,
              `${group.label} / ${item.title}`,
              subItem.icon
            )
          );
        }
      }
    }
  }

  return items;
}

export function getSearchAdminItems(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const group of MenuAdminList.navGroups) {
    for (const item of group.items) {
      items.push(
        createSearchItem(
          item.title,
          item.url,
          group.label,
          item.icon
        )
      );

      if (item.items?.length) {
        for (const subItem of item.items) {
          items.push(
            createSearchItem(
              subItem.title,
              subItem.url,
              `${group.label} / ${item.title}`,
              subItem.icon
            )
          );
        }
      }
    }
  }

  return items;
}