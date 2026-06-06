"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { MenuItem } from "./menu-list";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

interface NavMainProps {
  label: string;
  badge?: string;
  items: MenuItem[];
}

function getBadgeVariant(badge?: string) {
  switch (badge) {
    case "NEW":
      return "default";

    case "UPDATED":
      return "secondary";

    case "FIXED":
      return "outline";

    case "BETA":
      return "secondary";

    case "MAINTENANCE":
      return "destructive";

    case "SOON":
      return "outline";

    default:
      return "outline";
  }
}

export function NavMain({ label, badge, items }: NavMainProps) {
  const pathname = usePathname();

  const shouldBeOpen = (item: MenuItem) => {
    if (item.isActive) return true;

    return item.items?.some((subItem) => pathname === subItem.url) ?? false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        <span>{label}</span>

        {badge && (
          <Badge
            variant={getBadgeVariant(badge)}
            className="h-5 px-1.5 text-[10px]"
          >
            {badge}
          </Badge>
        )}
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={shouldBeOpen(item)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="cursor-pointer"
                    >
                      {item.icon && <item.icon />}

                      <span className="flex-1 truncate">{item.title}</span>

                      {item.badge && (
                        <Badge
                          variant={getBadgeVariant(item.badge)}
                          className="mr-1 h-5 px-1.5 text-[10px]"
                        >
                          {item.badge}
                        </Badge>
                      )}

                      <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                          >
                            <Link
                              href={subItem.url}
                              className="flex w-full items-center gap-2"
                            >
                              {subItem.icon && (
                                <subItem.icon className="size-4 shrink-0 text-muted-foreground" />
                              )}

                              <span className="flex-1 truncate">
                                {subItem.title}
                              </span>

                              {subItem.badge && (
                                <Badge
                                  variant={getBadgeVariant(subItem.badge)}
                                  className="h-4 px-1 text-[9px]"
                                >
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname === item.url}
                >
                  <Link
                    href={item.url}
                    className="flex w-full items-center gap-2"
                  >
                    {item.icon && <item.icon />}

                    <span className="flex-1 truncate">{item.title}</span>

                    {item.badge && (
                      <Badge
                        variant={getBadgeVariant(item.badge)}
                        className="h-5 px-1.5 text-[10px]"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
