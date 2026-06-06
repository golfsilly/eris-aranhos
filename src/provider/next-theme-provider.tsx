"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes"
import { ThemeProviderContext } from "@/contexts/theme-context"

type NextThemesProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: NextThemesProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeContextSync>{children}</ThemeContextSync>
    </NextThemesProvider>
  )
}

function ThemeContextSync({ children }: { children: React.ReactNode }) {
  const { theme, setTheme: setNextTheme } = useNextTheme()

  const normalizedTheme =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system"

  const setTheme = (t: "light" | "dark" | "system") => {
    // next-themes accepts the same string values
    setNextTheme(t)
  }

  return (
    <ThemeProviderContext.Provider value={{ theme: normalizedTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}