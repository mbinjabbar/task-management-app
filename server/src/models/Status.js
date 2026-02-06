import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  name: String,
  icon: String,
});

export default mongoose.model("Status", statusSchema, "statuses");
