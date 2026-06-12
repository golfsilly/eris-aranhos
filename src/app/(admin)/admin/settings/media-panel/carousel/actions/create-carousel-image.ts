"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload-image";
import { revalidatePath } from "next/cache";

export async function createCarouselImage(
  formData: FormData
) {
  const file = formData.get("image") as File | null;

  if (!file) {
    throw new Error("Image is required");
  }

  const title = String(formData.get("title") || "");
  const durationSec = Number(formData.get("durationSec") || 10);

  const upload = await uploadImage(file, "carousel");

  const maxSort = await prisma.carouselImage.count();

  await prisma.carouselImage.create({
    data: {
      title: title || null,
      imageUrl: upload.secureUrl,
      fileName: upload.originalFilename,
      cloudinaryId: upload.publicId,
      durationSec,
      sortOrder: maxSort,
      isActive: true,
    },
  });

  revalidatePath("/dashboard/carousel");
}