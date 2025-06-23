import { Router } from "express";
import { changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/Auth.js";

const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//Secure Routes
router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/change-details").patch(verifyJWT, updateUserAccountDetails)

export {router}