import { Router } from "express"
import { createList, displayAllList, updateListTitle } from "../controllers/listController.js";
import { verifyJWT } from "../middlewares/Auth.js";

const homeRouter = Router();


//secured Routes
homeRouter.route("/create-list").post(verifyJWT, createList)
homeRouter.route("/update-list/:listId").post(verifyJWT, updateListTitle)
homeRouter.route("/user-lists").get(verifyJWT ,displayAllList)

export {homeRouter}