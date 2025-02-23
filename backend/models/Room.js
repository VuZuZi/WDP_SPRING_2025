import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  RoomID: { type: Number, required: true, unique: true },
  HostID: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
  HouseID: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
  Price: { type: Number, required: true },
  Location: { type: String, required: true },
  Status: { 
    type: String, 
    enum: ["available", "booked", "maintenance"], 
    default: "available", 
    required: true 
  },
  Amenity: { type: String, required: true },
  Image: { type: String, required: true }, 
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
}, { versionKey: false }); // Tắt __v mặc định

const Room = mongoose.model("Room", roomSchema);
export default Room;
