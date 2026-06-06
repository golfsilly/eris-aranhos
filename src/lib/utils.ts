import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_URL}${path}`;
}

export async function getSetting(key: string) {
  return prisma.systemSetting.findUnique({
    where: { key },
  });
}

export async function getJsonSetting<T>(key: string): Promise<T | null> {
  const setting = await prisma.systemSetting.findUnique({
    where: { key },
  });

  return setting?.valueJson as T;
}

export const thaiDate = new Date().toLocaleDateString("th-TH", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
