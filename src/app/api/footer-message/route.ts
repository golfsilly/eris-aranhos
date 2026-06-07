import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = new Date();

  const messages = await prisma.footerMessage.findMany({
    where: {
      isActive: true,
      AND: [
        {
          OR: [
            { startAt: null },
            { startAt: { lte: now } },
          ],
        },
        {
          OR: [
            { endAt: null },
            { endAt: { gte: now } },
          ],
        },
      ],
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return Response.json(messages);
}