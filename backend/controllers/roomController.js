import Room from "../models/Room.js";

const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json({ success: true, room: savedRoom });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRoomById = async (req, res) => {
    const { id } = req.params; // Lấy RoomID từ URL

    try {
        const room = await Room.findOne({ RoomID: id }); // Tìm theo RoomID

        if (!room) {
            return res.status(404).json({ success: false, error: "Room not found" });
        }
        res.json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};



const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res.status(200).json({ success: true, room: updatedRoom });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res.status(200).json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom };

