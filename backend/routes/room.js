import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, getRoomsByFilter, updateRoom } from '../controllers/roomController.js';
import { uploadImage } from '../middleware/upload.js';
import verifyUser from "../middleware/authMiddleware.js";
import hostMiddleware from '../middleware/hostMiddleware.js';
const router = express.Router();

router.post('/create', verifyUser, hostMiddleware, uploadImage, createRoom);
router.get('/list', getAllRooms);
router.get('/', verifyUser, getRoomsByFilter);
router.get('/detail/:id', getRoomById);
router.put('/update/:id', verifyUser, hostMiddleware, uploadImage, updateRoom);
router.delete('/delete/:id', verifyUser, hostMiddleware, deleteRoom);

export default router;
