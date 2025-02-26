import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cấu hình lưu trữ file ảnh
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    // lưu vào folder avatar trên cloudinary
    params: {
        folder: "avatar",
    },
});

const upload = multer({
    storage: storage,
    // kiểm tra định dạng file
    fileFilter: (req, file, cb) => {
        const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
        // nếu định dạng file được phép upload thì accept
        if (allowedFormats.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            // nếu định dạng file không được phép upload thì reject
            cb(
                new Error("Invalid file format. Only JPG, PNG, and GIF are allowed!"),
                false
            ); // Reject the file
        }
    },
});

export { upload, cloudinary };