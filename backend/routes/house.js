import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import { getAllHouses } from "../controllers/houseController.js";

const router = express.Router();

router.get("/", verifyUser, getAllHouses);

export default router;
