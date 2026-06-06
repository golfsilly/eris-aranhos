export function applyContentLayout(value: "centered" | "full-width") {
  const root = document.documentElement;
  root.setAttribute("data-content-layout", value);
}

export function applyNavbarStyle(value: "sticky" | "scroll") {
  const root = document.documentElement;
  root.setAttribute("data-navbar-style", value);
}

export function applySidebarVariant(value: string) {
  const root = document.documentElement;
  root.setAttribute("data-sidebar-variant", value);
  // Notify listeners that sidebar attributes changed
  if (typeof window !== "undefined") {
    const detail = {
      variant: root.getAttribute("data-sidebar-variant"),
      collapsible: root.getAttribute("data-sidebar-collapsible"),
      side: root.getAttribute("data-sidebar-side"),
    };
    window.dispatchEvent(new CustomEvent("sidebar:change", { detail }));
  }
}

export function applySidebarCollapsible(value: string) {
  const root = document.documentElement;
  root.setAttribute("data-sidebar-collapsible", value);
  // Notify listeners that sidebar attributes changed
  if (typeof window !== "undefined") {
    const detail = {
      variant: root.getAttribute("data-sidebar-variant"),
      collapsible: root.getAttribute("data-sidebar-collapsible"),
      side: root.getAttribute("data-sidebar-side"),
    };
    window.dispatchEvent(new CustomEvent("sidebar:change", { detail }));
  }
}

export function applyFont(value: string) {
  const root = document.documentElement;
  root.setAttribute("data-font", value);
}
