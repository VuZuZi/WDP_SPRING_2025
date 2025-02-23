import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/create', createRoom);
router.get('/list', getAllRooms);
router.get('/detail/:id', getRoomById);
router.put('/update/:id', updateRoom);
router.delete('/delete/:id', deleteRoom);

export default router;
