import Room from "../models/Room.js";
import { cloudinary } from "../db/cloudinary.js";
import House from "../models/House.js";

const deleteImage = async (image) => {
  console.log(image);
  const publicId = image.split("/").slice(-2).join("/").split(".")[0];
  await cloudinary.uploader.destroy(publicId);
};

const createRoom = async (req, res) => {
  let imageUrl = null;
  const user = req.user;

  try {
    const { RoomID, HouseID, Price, Location, Amenity } = req.body;
    // Kiểm tra xem có ảnh được tải lên không
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No image uploaded!" });
    }
    // Lấy đường dẫn ảnh từ Cloudinary (secure_url là URL public)
    imageUrl = req.file.path;

    // Check roomId existed
    const checkRoom = await Room.findOne({ RoomID });

    if (checkRoom) {
      return res
        .status(400)
        .json({ success: false, error: "RoomID is existed!" });
    }
    // Tạo house mới
    let house;
    if (HouseID === "") {
      const newHouse = new House({
        HostID: user._id,
        Location,
      });
      house = await newHouse.save();
    }
    // Tạo phòng mới
    const newRoom = new Room({
      RoomID,
      HostID: user._id,
      HouseID: HouseID !== "" ? HouseID : house._id,
      Price,
      Location,
      Amenity,
      Image: imageUrl, // Lưu URL ảnh vào database
    });
    // Lưu vào database
    const savedRoom = await newRoom.save();
    res.status(201).json({ success: true, room: savedRoom });
  } catch (error) {
    if (imageUrl) {
      await deleteImage(imageUrl);
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRoomsByFilter = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const user = req.user;

    const rooms = await Room.find({ HostID: user._id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ CreatedAt: "desc" });
    const totalRoom = await Room.countDocuments({ HostID: user._id });

    res.status(200).json({
      success: true,
      rooms,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRoom / limit),
        totalRoom,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a room by ID
const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findOne({ RoomID: id });
    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res.json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update room information
const updateRoom = async (req, res) => {
  try {
    const user = req.user;
    const { RoomID, HouseID, Price, Location, Status, Amenity } = req.body;

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    const imgRoom = req.file ? req.file.path : null;
    // Tạo house mới
    let house;
    if (HouseID === "") {
      const newHouse = new House({
        HostID: user._id,
        Location,
      });
      house = await newHouse.save();
    }

    const updateData = {
      RoomID,
      HouseID: HouseID !== "" ? HouseID : house._id,
      Image: imgRoom ? imgRoom : room.Image,
      Price,
      Location,
      Status,
      Amenity,
    };

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json({ success: true, room: updatedRoom });
  } catch (error) {
    if (req.file) {
      console.log("Update failed, deleting new image...");
      await deleteImage(req.file.path);
    }
    return res
      .status(404)
      .json({ success: false, error: "Room update failed" });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  getRoomsByFilter,
};
