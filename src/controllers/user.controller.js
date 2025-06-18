
const registerUser = async(reg,res) => {
    res.status(200).json({
        message:"user Has been Registered"
    })
}

export {registerUser}