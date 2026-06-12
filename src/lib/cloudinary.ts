import { v2 as cloudinary } from "cloudinary";

function configureCloudinary() {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!name || !key || !secret) {
    // Do not throw during module import — server should still boot.
    // Log clearly so developers can see what's missing.
    console.warn(
      "Cloudinary not configured: missing CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET. Uploads will fail."
    );
    console.debug("CLOUDINARY_CLOUD_NAME:", JSON.stringify(name));
    console.debug("CLOUDINARY_API_KEY:", JSON.stringify(key));
    console.debug("CLOUDINARY_API_SECRET_LEN:", secret?.length);
    return;
  }

  cloudinary.config({
    cloud_name: name,
    api_key: key,
    api_secret: secret,
    secure: true,
  });
}

configureCloudinary();

export { cloudinary };