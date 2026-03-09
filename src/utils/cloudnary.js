import {v2} from "cloudinary";
import fs from "fs";





    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
    /*
     const uploadOnCloudinary = async = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .then((result) => {
           console.log(result);
       })
       .catch((error) => {
        fs.unlinkSync('shoes.jpg');// remove the temp file if the operation got field 
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);   */
    const uploadOnCloudinary = async (loadFilePath) =>{
        try{
            if(!loadFilePath) return null;
            const response = await cloudinary.uploader.upload(
                loadFilePath,{
                    resource_type:"auto"

                }
            
            )
            console.log("file is uploaded on cloudnary",
                response.url
            );
            return response;

        }
        catch(error){
            fs.unlinkSync(loadFilePath)
            return null;
        }
    } 


export {uploadOnCloudinary}