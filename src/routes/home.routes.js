import { Router } from "express"
import { createList } from "../controllers/listController.js";
import { verifyJWT } from "../middlewares/Auth.js";

const homeRouter = Router();


//secured Routes
homeRouter.route("/create-list").post(verifyJWT, createList)

export {homeRouter}