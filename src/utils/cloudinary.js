import { v2 as cloudinary} from "cloudinary";
import fs from "fs";



// initialised cloud service here .......................

cloudinary.config(
  {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
  }
);


// upload image here by using cloudinary upload method ......


const uploadOnCloudinary = async (localFilePath) => {
   
  try{
     
    // if localFilePath is null then 

     if( ! localFilePath) return null

    // if not null then upload this file 
    
     const response = await cloudinary.uploader.upload(localFilePath , {
      resource_type : "auto"
    })

    // now file has been successfully uploaded here
    
    console.log("File is uploaded on cloudinary ...." , response.url)
       
    return response;
  }
  catch(error){
     fs.unlinkSync(localFilePath)   // remove the locally saved temp files as the upload operation got failed 
     return null;
  }
}

export { uploadOnCloudinary }
