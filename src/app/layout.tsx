import type { Metadata } from "next";
import "./globals.css";
import { ProvidersReactQuery } from "@/provider/react-query-provider";
import { ThemeProvider } from "@/provider/next-theme-provider";
import { APP_CONFIG } from "@/config/app-config";
import { fontVars } from "@/lib/fonts/registry";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import { ThemeBootScript } from "@/scripts/theme-boot";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.hospital.website),
  title: {
    default: APP_CONFIG.seo.title,
    template: `%s | ${APP_CONFIG.seo.title}`,
  },
  description: APP_CONFIG.seo.description,
  icons: {
    icon: "/favicons/aranhoslogo/favicon.ico",
    apple: [
      {
        url: "/favicons/aranhoslogo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    theme_mode,
    theme_preset,
    content_layout,
    navbar_style,
    sidebar_variant,
    sidebar_collapsible,
    font,
  } = PREFERENCE_DEFAULTS;

  return (
    <html
      lang="th"
      data-theme-mode={theme_mode}
      data-theme-preset={theme_preset}
      data-content-layout={content_layout}
      data-navbar-style={navbar_style}
      data-sidebar-variant={sidebar_variant}
      data-sidebar-collapsible={sidebar_collapsible}
      data-font={font}
      suppressHydrationWarning
    >
      <head>
        <ThemeBootScript />
      </head>
      <body className={`${fontVars} bg-slate-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProvidersReactQuery>
            <TooltipProvider>
              <PreferencesStoreProvider
                themeMode={theme_mode}
                themePreset={theme_preset}
                contentLayout={content_layout}
                navbarStyle={navbar_style}
                font={font}
              >
                {children}
                <Toaster />
              </PreferencesStoreProvider>
            </TooltipProvider>
          </ProvidersReactQuery>
        </ThemeProvider>
      </body>
    </html>
  );
}