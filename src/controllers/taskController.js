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

const updateTask = async (req, res) => {
    const { Description, DueDate, IsCompleted } = req.body;
    const { taskId } = req.params;
  
    if (Description === undefined && DueDate === undefined && IsCompleted === undefined) {
      return res.status(400).json({
        status: "400",
        message: "At least one field must be provided to update",
      });
    }
  
    const updates = {};
    if (Description !== undefined) updates.Description = Description;
    if (DueDate !== undefined) updates.DueDate = DueDate;
    if (IsCompleted !== undefined) updates.IsCompleted = IsCompleted;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: updates },
        { 
            new: true,
            validateBeforeSave: false,
        }
      );
  
      if (!updatedTask) {
        return res.status(404).json({
          status: "404",
          message: "Task not found",
        });
      }
  
      return res.status(200).json({
        status: "200",
        message: "Task details have been updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
}

export {createTask, updateTask}