import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiErrors.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async (userId)=> {

    try {

       const user = await User.findById(userId)
       const refreshToken = user.generatRefreshToken()
       const accessToken =user.generateAccessToken()

       user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false})
       
       return {refreshToken , accessToken }


    } catch (error) {
      throw new ApiError(500, "Something went wrong while generating refresh and access token ")
    }
}


const registerUser = asyncHandler(async (req, res) => {
  // steps --- get user details by user
  // validation - not empty
  // check if user already exists
  // check image or files are not null ( image , avtar )
  // upload them to cloudinary , avtar
  // create user object crete entry in db
  // remove password and refresh token field from response
  // check response  , response may be either null or non-empty
  // return response
  // if response is null then throw error

  const { username, email, fullname, password } = req.body;

  if (
    [fullname, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are requires...");
  }

  // now check user is exist or not

  const existinguser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existinguser) {
    throw new ApiError(409, "User with this username or email id exists");
  }

  // by multer
  const avtarLocalPath = req.files?.avtar[0].path;
  const coverImageLoacalPath = req.files?.coverImage[0].path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Avtar file is required");
  }

  const avtar = await uploadOnCloudinary(avtarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLoacalPath);

  if (!avtar) {
    throw new ApiError(400, "Avtar file is not uploaded");
  }

  const user = await User.create({
    fullname,
    avtar: avtar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createduser) {
    throw new ApiError(500, "Somethin went wrong during creation user");
  }

  // return response in proper way

  return res.status(201).json(new ApiResponse(200, createduser));
});


// login system start here .................

const loginUser = asyncHandler ( async ( req , res) =>{

  // get login details from user 
  
   const { username , password , email } = req.body

  // check username or email is null or not null

   if( !username || !email){
    throw new ApiError(400, "Username or email is required !! Please enter details.. ")
   }

   // find user by username and email 

   const user = await User.findOne({
    $or: [{username}, {email}]
   })

  // check user is exist or not 

   if(!user){
    throw new ApiError(404, "User does not exist")
   }

   // check password 

   const isPassawordValid = await user.isPasswordCorrect(password)

   // password is wrong 

   if(!isPassawordValid){
    throw new ApiError(404, "Invalid user credentials !! Please check password")
   }

   // generate refresh and access token 

     const {refreshToken , accessToken } = await generateAccessAndRefreshTokens(user._id)

   // logged in user 

   const loggedInUser = await User.findById(user._id).select (" -password -refreshToken")

   const options = {
    httpOnly : true,
    secure : true
   }

   return res
   .status(200)
   .cookie("accessToken" ,accessToken, options )
   .cookie("refreshToken" , refreshToken, options)
   .json(
    new ApiResponse(
      200,
      {
        user : loggedInUser, accessToken, refreshToken
      },
      "User logged in successfully ....."
    )
   )
})


// logout process goes here .............

const logoutUser = asyncHandler( async ( req, res)=>{
  
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken : undefined
        }
      },
      {
        new : true
      }

     )

     const options = {
      httpOnly: true,
      secure : true
     }


     return res
     .status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(
          new ApiResponse(200, {}, "User loggedout successfully")
     )
})


// change current password 

const changeCurrentPassword = asyncHandler( async ( req , res )=> {

  // take details from loggedin user

  const {oldPassword , newPassword } = req.body

  //find user by id 

  const user = await User.findById(req.user?._id) 
  
  // validate old password

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  // if old password is wrong 
  if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid old password !! Please check and retry ..")
  }

// set new password 
user.password = newPassword

// save user into database 

await user.save({validateBeforeSave : false})


// send response to the loggedin user

return res.status(200).json(
  new ApiResponse(200, {}, "Password changed successfully !!!!")
)

})


// method for find current user 

const getCurrentUser = asyncHandler( async (req , res) =>{
 
  return res.status(200).json(200 , req.user , "Current user fetched successfully!!!!! ")
})


// handler for update user details 

const updateAccountDetails = asyncHandler( async (req , res) =>{

  const {fullname , email} = req.body

  if(!fullname || !email){
    throw new ApiError(400 , "All feilds are required !!!!! ")
  }

  // find user 

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set : {
        fullname , 
        email : email
      }
    },{
      new : true
    }

  ).select(" -password ")

  return res
  .status(200)
  .json(new ApiResponse(200, {}, "Account details updated successfully!!!!!!!!! "))

})


// update user profile image or we can say that avtar iamge 

const updateAvtar = asyncHandler ( async (req , res )=>{
 
  // get path which is provide by multer 

  const avtarLocalPath = req.file?.path

  // check path is found or not 


  if(!avtarLocalPath){
    throw new ApiError(400 , "Image is not found please upload a file  !!!!!")
  }


  // now we need to upload this image in cloudinary 

  const avtar  = await uploadOnCloudinary(avtarLocalPath)

  // check image upload on cloud or not 

  if(! avtar.url ){
    throw new ApiError(400 , "Error occured during image upload on cloud....")
  }

  // now update in databse

 const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
          avtar: avtar.url
      }
    },
    {
      new : true
    }
  ).select(" -password")

  return res.status(200).json( new ApiResponse(200, user , "avtar image updated successfully"))

})

// update coverImage 

const updateCoverImage = asyncHandler ( async (req , res )=>{ 
 
  // get path which is provide by multer 

  const coverImageLocalPath = req.file?.path

  // check path is found or not 


     if(!coverImageLocalPath){
       throw new ApiError(400 , "cover image is not found please upload a file  !!!!!")
     }


  // now we need to upload this image in cloudinary 

  const coverImage  = await uploadOnCloudinary(coverImageLocalPath)

  // check image upload on cloud or not 

  if(! coverImage.url ){
    throw new ApiError(400 , "Error occured during cover image upload on cloudinary....")
  }

  // now update in databse

 const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url
      }
    },
    {
      new : true
    }
  ).select(" -password")

     return res.status(200).json( new ApiResponse(200, user , "Cover image updated successfully")
  )

})

// getUserChannelProfile and details 

const getUserChennelProfile = asyncHandler(async (req, res) => {

  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "User not found !!!");
  }

  const chennel = await User.aggregate([
    {
      $match:{
        username: username?.toLowerCase()
      }
    },
    {
      $lookup:{
        from:"Subscription",
        localField:"_id",
        foreignField:"chennel",
        as:"subscribers"
      }
    }, 
    {
      $lookup:{
        from:"Subscription",
        localField:"_id",
        foreignField:"subscriber",
        as:"subscribedTo"
      }
    },
    {
      $addFields:{
        subscribersCount:{
          $size:"$subscribers"
        },
        chennelSubscribedToCount:{
          $size:"$subscribedTo"
        },
        isSubscribed:{
          $cond:{
            if:{$in: [req.user?._id, "$subscribers.subscriber"]},
            then:true,
            else:false
          }
        }
       
      }
    },{
      $project:{
        fullname:1,
        username:1,
        subscribersCount:1,
        chennelSubscribedToCount:1,
        isSubscribed:1,
        avtar:1,
        email:1,
        coverImage:1,
        createdAt:1
      }
    }

  ]) 

  if(!chennel){
    throw new ApiError(400, "Chennel does not exists !!!!!!!!!!!! ")
  }

  return res.status(200).json(
     new ApiResponse(200, chennel[0], "User chennel fetched successfully !!!!!!!!!!! ")
  )
});


// getuser history

const getWatchHistory = asyncHandler( async(req, res)=>{
  const user = await User.aggregate([
    {
      $match:{
        _id: new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $lookup:{
        from:"videos",
        localField:"watchHistory",
        foreignField:"_id",
        as: "watchHistory",
        pipeline:[
          {
            $lookup:{
              from:"users",
              localField:"owner",
              foreignField:"_id",
              as:"owner",
              pipeline:[
                {
                  $project:{
                    fullname:1,
                    username:1,
                    avtar:1
                  }
                },
                {
                  $addFields:{
                    owner:{
                      $first:"$owner"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]) 

  return res.status(200).json(
    new ApiResponse(200, user[0].watchHistory, "User watchhistory fetched successFully !!!!!!!!! ")
  )
})


export { registerUser, loginUser, logoutUser, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvtar, updateCoverImage, getUserChennelProfile , getWatchHistory};
