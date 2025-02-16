import bcrypt from "bcrypt";
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


// Cập nhật thông tin hồ sơ
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({ success: true, user: updatedUser });
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

export { getProfile, updateProfile, changePassword, updateAvatar };
