"use client"

import * as React from "react"

export interface SidebarConfig {
  variant: "sidebar" | "floating" | "inset"
  collapsible: "offcanvas" | "icon" | "none"
  side: "left" | "right"
}

export interface SidebarContextValue {
  config: SidebarConfig
  updateConfig: (config: Partial<SidebarConfig>) => void
}

export const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function SidebarConfigProvider({ children }: { children: React.ReactNode }) {
  function getInitialConfig(): SidebarConfig {
    if (typeof window === "undefined") {
      return { variant: "inset", collapsible: "offcanvas", side: "left" };
    }

    const root = document.documentElement;
    const variant = (root.getAttribute("data-sidebar-variant") as SidebarConfig["variant"]) || "inset";
    const collapsible = (root.getAttribute("data-sidebar-collapsible") as SidebarConfig["collapsible"]) || "offcanvas";
    const side = (root.getAttribute("data-sidebar-side") as SidebarConfig["side"]) || "left";

    return { variant, collapsible, side };
  }

  const [config, setConfig] = React.useState<SidebarConfig>(getInitialConfig);

  const updateConfig = React.useCallback((newConfig: Partial<SidebarConfig>) => {
    setConfig((prev) => {
      const merged = { ...prev, ...newConfig };

      if (typeof window !== "undefined") {
        const root = document.documentElement;
        root.setAttribute("data-sidebar-variant", merged.variant);
        root.setAttribute("data-sidebar-collapsible", merged.collapsible);
        root.setAttribute("data-sidebar-side", merged.side);
      }

      return merged;
    });
  }, []);

  // Observe attribute changes on <html> so that external preference utilities
  // that set `data-sidebar-variant` / `data-sidebar-collapsible` are reflected
  // into this provider immediately without requiring a full page refresh.
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setConfig((prev) => ({
        variant: (root.getAttribute("data-sidebar-variant") as SidebarConfig["variant"]) || prev.variant,
        collapsible:
          (root.getAttribute("data-sidebar-collapsible") as SidebarConfig["collapsible"]) || prev.collapsible,
        side: (root.getAttribute("data-sidebar-side") as SidebarConfig["side"]) || prev.side,
      }));
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-sidebar-variant", "data-sidebar-collapsible", "data-sidebar-side"],
    });

    return () => observer.disconnect();
  }, []);

  // Also listen for explicit sidebar change events from preference utilities
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (!detail) return;
      setConfig((prev) => ({
        variant: (detail.variant as SidebarConfig["variant"]) || prev.variant,
        collapsible: (detail.collapsible as SidebarConfig["collapsible"]) || prev.collapsible,
        side: (detail.side as SidebarConfig["side"]) || prev.side,
      }));
    };

    window.addEventListener("sidebar:change", handler as EventListener);
    return () => window.removeEventListener("sidebar:change", handler as EventListener);
  }, []);

  return (
    <SidebarContext.Provider value={{ config, updateConfig }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarConfig() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarConfig must be used within a SidebarConfigProvider")
  }
  return context
}
