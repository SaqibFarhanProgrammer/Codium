import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary() {
  const imagePath = path.join(
    process.cwd(),
    "public/image.png"
  );

  const result = await cloudinary.uploader.upload(imagePath);
  return result;
}

export default uploadOnCloudinary;
