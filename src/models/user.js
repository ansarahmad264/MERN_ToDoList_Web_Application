import { Timestamp } from 'bson';
import mongoose from 'mongoose';

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

export const User = mongoose.model('User', userSchema);
