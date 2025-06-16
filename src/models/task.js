import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    IsCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    AssociatedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
