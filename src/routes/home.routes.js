import { Router } from "express"
import { createList, updateListTitle } from "../controllers/listController.js";
import { verifyJWT } from "../middlewares/Auth.js";

const homeRouter = Router();


//secured Routes
homeRouter.route("/create-list").post(verifyJWT, createList)
homeRouter.route("/update-list/:listId").post(verifyJWT, updateListTitle)

export {homeRouter}