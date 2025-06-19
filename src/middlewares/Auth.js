import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const verifyJWT = async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id)
    
        if(!user){
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }
    
        req.user = user
        next()
    } catch (error) {
        console.log("401 - Invalid Access Token", error)
    }
}