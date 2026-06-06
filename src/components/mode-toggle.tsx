"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative
        size-9
        rounded-full
        border
        border-border
        bg-background
        text-muted-foreground
        hover:bg-accent
        hover:text-accent-foreground
        transition-all
        duration-200
        active:scale-95
      "
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}