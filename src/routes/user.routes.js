import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/Auth.js";

const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//Secure Routes
router.route("/logout").post(verifyJWT ,logoutUser)

export {router}