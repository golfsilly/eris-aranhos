"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const FooterMessageSchema = z.object({
  title: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required"),
  isActive: z.boolean(),
  startAt: z.string().optional().nullable(),
  endAt: z.string().optional().nullable(),
});

export type FooterMessageFormData = z.infer<typeof FooterMessageSchema>;

export async function getFooterMessages() {
  return await prisma.footerMessage.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createFooterMessage(data: FooterMessageFormData) {
  try {
    const parsed = FooterMessageSchema.parse(data);

    const lastItem = await prisma.footerMessage.findFirst({
      orderBy: { sortOrder: "desc" },
    });

    await prisma.footerMessage.create({
      data: {
        title: parsed.title ?? null,
        message: parsed.message,
        isActive: parsed.isActive,
        sortOrder: (lastItem?.sortOrder ?? -1) + 1,
        startAt: parsed.startAt ? new Date(parsed.startAt) : null,
        endAt: parsed.endAt ? new Date(parsed.endAt) : null,
      },
    });

    revalidatePath("/footer-messages");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง" };
    }
    return { success: false, error: "Failed to create footer message" };
  }
}

export async function updateFooterMessage(
  id: string,
  data: FooterMessageFormData
) {
  try {
    const parsed = FooterMessageSchema.parse(data);

    await prisma.footerMessage.update({
      where: { id },
      data: {
        title: parsed.title ?? null,
        message: parsed.message,
        isActive: parsed.isActive,
        startAt: parsed.startAt ? new Date(parsed.startAt) : null,
        endAt: parsed.endAt ? new Date(parsed.endAt) : null,
      },
    });

    revalidatePath("/footer-messages");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง" };
    }
    return { success: false, error: "Failed to update footer message" };
  }
}

export async function deleteFooterMessage(id: string) {
  try {
    await prisma.footerMessage.delete({ where: { id } });
    revalidatePath("/footer-messages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete footer message" };
  }
}

export async function reorderFooterMessages(
  items: { id: string; sortOrder: number }[]
) {
  try {
    await prisma.$transaction(
      items.map(({ id, sortOrder }) =>
        prisma.footerMessage.update({
          where: { id },
          data: { sortOrder },
        })
      )
    );

    revalidatePath("/footer-messages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to reorder footer messages" };
  }
}

export async function toggleFooterMessageActive(
  id: string,
  isActive: boolean
) {
  try {
    await prisma.footerMessage.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/footer-messages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to toggle status" };
  }
}