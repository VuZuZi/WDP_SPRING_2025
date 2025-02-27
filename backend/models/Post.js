import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    PostID: { type: Number, required: true, unique: true },
    HostID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    RoomID: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false } // Tắt __v mặc định
);

const Post = mongoose.model("Post", postSchema);
export default Post;