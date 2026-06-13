import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_URL}${path}`;
}

export const thaiDate = new Date().toLocaleDateString("th-TH", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
