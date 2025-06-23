import { Router } from "express"
import { createTask } from "../controllers/taskController.js"
import { verifyJWT } from "../middlewares/Auth.js"

const taskRouter = Router()

//secured Routes
taskRouter.route("/create-task/:listId").post(verifyJWT ,createTask)

export { taskRouter }