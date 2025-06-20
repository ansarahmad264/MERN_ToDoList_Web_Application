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

export {createList}