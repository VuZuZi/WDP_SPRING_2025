import bcrypt from "bcrypt";
import User from "../models/User.js";
import multer from "multer";
import path from "path";

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


// Cập nhật thông tin hồ sơ
const updateUserProfile = async (req, res) => {
    try {
        // Lấy thông tin người dùng từ request (req.user sẽ được gán bởi middleware verifyUser)
        const user = req.user;
        
        // Cập nhật các thông tin cần thiết
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;

        // Nếu có ảnh mới, cập nhật ảnh người dùng
        if (req.file) {
            user.profileImage = req.file.path;
        }

        await user.save();

        // Trả về thông tin người dùng sau khi cập nhật
        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error updating profile" });
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
        const { profileImage } = req.body;

        if (!profileImage) return res.status(400).json({ success: false, error: "No image provided" });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profileImage },
            { new: true }
        ).select("-password");

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



export { getProfile, updateUserProfile , changePassword, updateAvatar };

