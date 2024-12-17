import { v2 as cloudinary } from 'cloudinary' // Import the cloudinary v2 library

cloudinary.config({
    cloud_name: Bun.env.CLOUD_NAME,
    api_key: Bun.env.CLOUD_API_KEY,
    api_secret: Bun.env.CLOUD_API_SECRET,
})

export const Cloudinary = cloudinary