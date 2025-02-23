
import Room from '../models/Room.js';
// Create a new room with an image
const createRoom = async (req, res) => {
  try {
    const { RoomID, HostID, HouseID, Price, Location, Status, Amenity } = req.body;
    const image = req.file ? req.file.path : null;

    const newRoom = new Room({
      RoomID,
      HostID,
      HouseID,
      Price,
      Location,
      Status,
      Amenity,
      Image: image,
    });

    const savedRoom = await newRoom.save();
    res.status(201).json({ success: true, room: savedRoom });
  } catch (error) {
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

// Get a room by ID
const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findOne({ RoomID: id });
    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res.json({ success: true, data: room});
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update room information
const updateRoom = async (req, res) => {
  try {
    const { RoomID, HostID, HouseID, Price, Location, Status, Amenity } = req.body;
    const image = req.file ? req.file.path : null;

    const updateData = {
      RoomID,
      HostID,
      HouseID,
      Price,
      Location,
      Status,
      Amenity,
    };

    if (image) {
      updateData.Image = image;
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }
    res.status(200).json({ success: true, room: updatedRoom });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a room
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

