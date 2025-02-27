import House from "../models/House.js";

const getAllHouses = async (req, res) => {
  try {
    const user = req.user;
    const house = await House.find({ HostID: user._id });
    res.status(200).json({ success: true, house });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getAllHouses };
