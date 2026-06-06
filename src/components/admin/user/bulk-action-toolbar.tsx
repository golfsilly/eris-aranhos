import { prisma } from "@/lib/prisma";

enableRowSelection: true

export async function bulkDisableUsers(
  ids: string[]
) {
  await prisma.user.updateMany({
    where: {
      id: {
        in: ids,
      },
    },

    data: {
      isActive: false,
    },
  });
}