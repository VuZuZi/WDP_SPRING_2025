import express from "express";
import { changePassword, getProfile, updateAvatar, updateUserProfile } from "../controllers/userController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/profile', verifyUser,getProfile);
router.put('/profile', verifyUser, updateUserProfile);
router.put("/change-password", verifyUser, changePassword);
router.post("/upload-avatar", verifyUser, updateAvatar);

export default router;
