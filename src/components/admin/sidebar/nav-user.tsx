"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  CircleUser,
  EllipsisVertical,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const getRoleBadgeStyles = (role: string) => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "bg-red-500/10 text-red-600 hover:bg-red-500/15 border-red-500/20 dark:text-red-400";
    case "DOCTOR":
      return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/15 border-blue-500/20 dark:text-blue-400";
    case "NURSE":
      return "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 border-emerald-500/20 dark:text-emerald-400";
    case "STAFF":
      return "bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 border-amber-500/20 dark:text-amber-400";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();

  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  const user = session?.user;

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  const avatarSrc =
    user.image ||
    `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(
      user.email || user.name || "ERIS",
    )}`;

  const initials = user.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                cursor-pointer
                data-[state=open]:bg-sidebar-accent
                data-[state=open]:text-sidebar-accent-foreground
              "
            >
              <Avatar className="size-8 border border-border">
                <AvatarImage src={avatarSrc} alt={user.name ?? "User"} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>

                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>

              <EllipsisVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            className="min-w-64 rounded-lg"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {session.user.name}
                  </p>

                  {session.user.role && (
                    <Badge
                      variant="outline"
                      className={`h-5 px-1.5 text-[10px] font-bold tracking-wider ${getRoleBadgeStyles(session.user.role)}`}
                    >
                      {session.user.role}
                    </Badge>
                  )}
                </div>

                <p className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer">
                    <ShieldCheck className="size-4" />
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link href="/settings/account" className="cursor-pointer">
                  <CircleUser className="size-4" />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
