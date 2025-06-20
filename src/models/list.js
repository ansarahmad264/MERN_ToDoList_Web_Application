import mongoose from 'mongoose';
const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const List = mongoose.model('List', listSchema);
