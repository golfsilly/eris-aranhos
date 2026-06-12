import { cloudinary } from "@/lib/cloudinary";

export async function deleteImage(
  publicId: string
) {
  return cloudinary.uploader.destroy(
    publicId
  );
}