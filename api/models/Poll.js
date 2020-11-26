import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  options: [
    { text: String, voters: [{ ip: String, voted_option_id: String }] },
  ],
  type: String,
  date: Date,
});

export default mongoose.model("Poll", pollSchema);
