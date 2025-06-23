import { Router } from "express"
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskController.js"
import { verifyJWT } from "../middlewares/Auth.js"

const taskRouter = Router()

//secured Routes
taskRouter.route("/create-task/:listId").post(verifyJWT ,createTask)
taskRouter.route("/update-task/:taskId").patch(verifyJWT, updateTask)
taskRouter.route("/delete-task/:taskId").delete(verifyJWT, deleteTask)
taskRouter.route("/get-tasks/:listId").get(verifyJWT, getAllTasks)

export { taskRouter }