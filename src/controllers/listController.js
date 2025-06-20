import {List} from "../models/list.js"


const createList = async(req,res) =>{
    const {title} = req.body

    if(!title){
        console.log("Title Field is Required")
    }

    const list = await List.create({
        title,
        CreatedBy: req.user._id
    })

    const createdList = await List.findById(list._id)
    if(!createdList){
        console.log("500 - Server was unable to create List")
    }

    return res.status(200)
    .json(200, list, "List Has been Created Successfully")
}

const updateListTitle = async(req,res) =>{
    const {title} = req.body
    const{listId} = req.params

    if(!title){
        return res.status(400, "title cannot be empty")
    }

    
    const updatedList = await List.findByIdAndUpdate(
        listId,
        {
            $set:{
                title
            }
        },
        {
            new: true
        }
    )

    if (!updatedList) {
        return res.status(404).json({ message: "List not found or unauthorized" });
      }

    return res.status(200)
    .json({
        statusCode: 200,
        message: "List Updated Successfully",
        data: updatedList
      })

}

const displayAllList = async(req,res) =>{

    const userLists = await List.find({CreatedBy:req.user._id})
                                .select("-_id -createdAt -updatedAt -__v") 
                                .populate("CreatedBy", "fullName -_id");

    if(!userLists){
        return res
        .status(404)
        .json({
            statusCode: 200,
            message: "No List Found"
        })
    }

    return res.status(200)
    .json({
        statusCode: 200,
        message: "List Loaded Successfully",
        data: userLists
      })
}

const deleteList = async(req,res) => {
    const{listId} = req.params

    
    const deletedList = await List.findByIdAndDelete(listId);

    if (!deletedList) {
    return res.status(404).json({ message: "List not found" });
    }

    return res.status(200).json({
    message: "List deleted successfully",
    data: deletedList
    });
}

export {createList,updateListTitle,displayAllList,deleteList}