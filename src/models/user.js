import { Timestamp } from 'bson';
import mongoose, {schema} from 'mongoose';
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowerase: true,
    },
    password: {
      required: true,
      type: string,
    },
  },
  { timestamps: true }
);

//hash the password before saving if its modified
userSchema.pre("save", function(next){
  if(!this.isModified("password"))return next();

  this.password = bcrypt.hash("password",10)
  next();
})

//checks if the password entered by the user is correct
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
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
