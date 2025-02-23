
// import express from 'express';

// import connectToDatabase from './db/db.js';


// connectToDatabase();
// const app = express();

// // Middleware



// app.listen(process.env.PORT, () => {
//     console.log(`Server is Running on port ${process.env.PORT}`);
// });
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectToDatabase from "./db/db.js";
import authRouter from './routes/auth.js';
import userRouter from "./routes/userRoutes.js";

import roomRouter from './routes/room.js';
dotenv.config(); // Load biến môi trường

const app = express();
const PORT = process.env.PORT ; // Lấy PORT từ .env, nếu không có thì mặc định là 5000

// Kết nối MongoDB
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter)
app.use("/api/user", userRouter);

app.use('/api/rooms', roomRouter)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
