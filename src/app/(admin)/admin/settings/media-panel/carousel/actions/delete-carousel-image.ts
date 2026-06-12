"use server";

import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function deleteCarouselImage(
  id: string
) {
  const image =
    await prisma.carouselImage.findUnique({
      where: { id },
    });

  if (!image) {
    throw new Error("Image not found");
  }

  // ลบจาก Cloudinary ก่อน
  if (image.cloudinaryId) {
    await cloudinary.uploader.destroy(
      image.cloudinaryId
    );
  }

  // ลบจาก DB
  await prisma.carouselImage.delete({
    where: { id },
  });

  revalidatePath("/dashboard/carousel");
}