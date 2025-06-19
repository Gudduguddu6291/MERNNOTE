import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if (!filePath) {
           return null;
        }
        const result = await cloudinary.uploader.upload(filePath, { resource_type: 'raw' , type: "upload",               // Required for raw files
        flags: "attachment",          // This enables direct download/view
        use_filename: true,
        unique_filename: false
});
        fs.unlinkSync(filePath); // Delete the file after upload
        return result.secure_url; // Return the URL of the uploaded image
    } 
    catch (error) {
        fs.unlinkSync(filePath); // Delete the file in case of error
        console.error('Error uploading to Cloudinary:', error);
    }
}
export default uploadOnCloudinary;