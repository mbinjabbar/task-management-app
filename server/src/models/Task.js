import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    progress: { type: Number, default: 0 },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },

    isFavorite: {
      type: Boolean,
      default: false
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema);