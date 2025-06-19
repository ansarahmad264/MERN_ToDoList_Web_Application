
import { User } from "../models/user.js"
const registerUser = async(req,res) => {
    //get user details from frontend
    //validate user details - not empty
    //check if user already exist
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    const {username, fullName, email, password} = req.body
    console.log("username: ", username)
    console.log("FullName: ", fullName)
    console.log("Email: ", email)
    console.log("Password: ", password)

    if(
        [username, fullName, email, password].some((fields) =>{
            fields?.trim() == ""
        })
    ){
        console.log("All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existingUser){
        console.log("user with username or email already exist");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        console.error("server was unable to store the user", 500)
    }

    return res.status(200).json({
        message: "User Registered Successfully"
    })

}

export {registerUser}