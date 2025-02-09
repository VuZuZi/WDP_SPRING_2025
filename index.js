const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const authRouter= require("./routes/auth");

dotenv.config();
const app = express();

// Kết nối MongoDB bằng async/await
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
}

// Gọi hàm kết nối MongoDB
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRouter);

app.listen(8080, () => {
    console.log(`✅ Server is running on port ${port}`);
});
