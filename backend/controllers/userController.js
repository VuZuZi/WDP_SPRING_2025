import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

// Lấy thông tin hồ sơ người dùng
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("name email phone profileImage"); // Chắc chắn lấy email
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
      const { name, email, phone } = req.body;
  
      // Validate email format
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ success: false, error: "Invalid email format" });
      }
  
      const updatedFields = {};
  
      if (name) updatedFields.name = name;
      if (email) updatedFields.email = email;
      if (phone) updatedFields.phone = phone;
      if (req.file) updatedFields.profileImage = req.file.path;  // Handle file upload
  
      const user = await User.findByIdAndUpdate(req.user._id, updatedFields, { new: true }).select('-password');
  
      if (!user) return res.status(404).json({ success: false, error: "User not found" });
  
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  

// Thay đổi mật khẩu
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ success: false, error: "Old password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Upload ảnh đại diện
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: "No image provided" });

    // Check if the file is an image
    if (!req.file.mimetype.startsWith('image')) {
      return res.status(400).json({ success: false, error: "Please upload an image file" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { profileImage: req.file.path }, { new: true }).select("-password");

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });



export { changePassword, getProfile, updateAvatar, updateUserProfile };

