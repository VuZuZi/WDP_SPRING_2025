import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, changePassword, updateAvatar } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", verifyUser, getProfile);
router.put("/profile", verifyUser, updateProfile);
router.put("/change-password", verifyUser, changePassword);
router.post("/upload-avatar", verifyUser, updateAvatar);

export default router;
