import { Router} from "express"

import { registerUser, loginUser, logoutUser, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvtar, updateCoverImage, getUserChennelProfile, getWatchHistory } from "../controllers/user.controller.js"

import { upload } from "../middleware/multer.middleware.js"

import   { verifyJWT }  from "../middleware/auth.middleware.js"
 


const router = Router()

router.route("/register").post(
  upload.fields(
    [
      {
        name : "avtar",
        maxCount : 1
      },
      {
        name:"coverImage",
        maxCount: 1
      }
    ]
  ),
  registerUser
)

router.route("/login").post(loginUser)

// secured routes 

router.route("/logout").post(verifyJWT , logoutUser)

// refresh token router

// router.route("/refresh-token").post(refreshAccessToken)

// change password ..........

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

// router for get currentuser

router.route("/current-user").get(verifyJWT, getCurrentUser)

// router for update account details 

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// router for update avtar image 

router.route("/avtar").patch(verifyJWT, upload.single("/avtar"), updateAvtar)


// update cover image 

router.route("/coverImage").patch(verifyJWT, upload.single("/coverImage"), updateCoverImage)

// router for user profile 

router.route("/c/:username").get(verifyJWT, getUserChennelProfile)

// router for watch history 

router.route("/watchHistory").get(verifyJWT, getWatchHistory)

export default router