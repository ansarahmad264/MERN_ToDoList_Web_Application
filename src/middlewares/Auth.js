import { jwt } from "jsonwebtoken"
import { User } from "../models/user.js"

export const verifyJWT = async(req,res,next) => {
    try {
        const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            console.log("401 - Unathurized Request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id)
    
        if(!user){
            console.log("401 - Invalid Access Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        console.log("401 - Invalid Access Token", error)
    }
}