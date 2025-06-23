import { Task } from "../models/task.js"

const createTask = async(req,res) => {
    const {Description, DueDate, IsCompleted} = req.body
    const {listId} = req.params

    if(!Description){
        return res.status(400).json({message: "Descriptions Cannot be Empty"})
    }

    const task = await Task.create({
        Description,
        DueDate,
        IsCompleted,
        AssociatedWith: listId
    })

    const createdTask = await Task.findById(task._id)

    if(!createdTask){
        return res.status(500).json({status:"500", message:"Server Couldnot Create task"})
    }

    return res.status(200)
    .json({
        status: "200",
        message:"Task Has Been Created Successfully",
        data: createdTask
    })
}

export {createTask}