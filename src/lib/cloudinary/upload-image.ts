import { cloudinary } from "@/lib/cloudinary";

type UploadFolder =
  | "carousel"
  | "avatar"
  | "news";

export async function uploadImage(
  file: File,
  folder: UploadFolder
) {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!name || !key || !secret) {
    throw new Error(
      "Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET."
    );
  }
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const base64 = buffer.toString("base64");

  const dataUri = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: "image",
    });

    return {
      secureUrl: result.secure_url,
      publicId: result.public_id,
      originalFilename: result.original_filename,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
}