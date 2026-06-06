"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  LogOut,
  User,
  LayoutDashboard,
  ShieldCheck,
  CircleUser,
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

export function UserProfileButton({ initialSession }: { initialSession?: any }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const currentSession = initialSession ?? session;
  const avatarSrc =
    currentSession?.user.image ||
    `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(
      currentSession?.user.email || currentSession?.user.name || "ERIS",
    )}`;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (!currentSession?.user && isPending) {
    return (
      <Skeleton className="size-12 rounded-full border border-border bg-muted" />
    );
  }

  if (!currentSession?.user) {
    return (
      <Link href="/auth/signin">
        <Button
          variant="outline"
          className="group gap-2 border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <User className="size-4" />
          <span className="font-medium text-sm">เข้าสู่ระบบ</span>
        </Button>
      </Link>
    );
  }

const userInitials = currentSession?.user?.name
  ? currentSession.user.name
      .split(" ")
      .map((name: string) => name[0]) 
      .join("")
      .slice(0, 2)
      .toUpperCase()
  : "ER";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-10 rounded-full p-0 border border-border bg-background hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring transition-all active:scale-95 shrink-0"
        >
          <Avatar className="size-full">
            <AvatarImage
              src={avatarSrc}
              alt={currentSession.user.name || "User profile"}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" forceMount className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {currentSession.user.name}
              </p>

              {currentSession.user.role && (
                <Badge
                  variant="outline"
                  className={`h-5 px-1.5 text-[10px] font-bold tracking-wider ${getRoleBadgeStyles(currentSession.user.role)}`}
                >
                  {currentSession.user.role}
                </Badge>
              )}
            </div>

            <p className="truncate text-xs text-muted-foreground">
              {currentSession.user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer gap-2">
              <LayoutDashboard className="size-4 text-muted-foreground" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>

          {currentSession.user.role === "ADMIN" && (
            <Link href="/admin">
              <DropdownMenuItem className="cursor-pointer gap-2">
                <ShieldCheck className="size-4 text-muted-foreground" />
                <span>Admin Panel</span>
              </DropdownMenuItem>
            </Link>
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
          onClick={handleSignOut}
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" />
          <span>ออกจากระบบ</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
