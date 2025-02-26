import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
    Location: { type: String, required: true },
    Description: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
}, { versionKey: false }); // Tắt __v mặc định

const House = mongoose.model("House", houseSchema);
export default House;
