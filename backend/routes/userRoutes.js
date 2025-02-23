import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import { getProfile, updateUserProfile , changePassword, updateAvatar } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", verifyUser, getProfile);
router.put('/profile', verifyUser, updateUserProfile);
router.put("/change-password", verifyUser, changePassword);
router.post("/upload-avatar", verifyUser, updateAvatar);

export default router;
