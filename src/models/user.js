import mongoose, {Schema} from 'mongoose';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullName:{
      type: String,
      required: true,
      trim: true, 
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerase: true,
    },
    password: {
      required: true,
      type: String,
    },
    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);

//hash the password before saving if its modified
userSchema.pre("save", function(next){
  if(!this.isModified("password"))return next();

  this.password = bcryptjs.hash("password",10)
  next();
})

//checks if the password entered by the user is correct
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id:this._id,
      userName:this.username,
      email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id:this._id,
      userName:this.username,
      email:this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  ) 
}

export const User = mongoose.model('User', userSchema);
