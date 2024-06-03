// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

async function cloudinary_upload(imageUri: string) {
  try {
    // uploading image to cloudinary and getting the url
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg", // Ensure you specify the correct image type
      name: "photo.jpg",
    } as any);
    formData.append("upload_preset", "jsm_sorular");
    //   formData.append("api_key", process.env.CLOUDINARY_API_KEY);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
export { cloudinary_upload };
