import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/roomController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/create', upload.single('image'), createRoom);
router.get('/list', upload.single('image') ,getAllRooms);
router.get('/detail/:id', getRoomById);
router.put('/update/:id', updateRoom);
router.delete('/delete/:id', deleteRoom);

export default router;
