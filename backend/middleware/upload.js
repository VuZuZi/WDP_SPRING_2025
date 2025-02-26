import multer from 'multer';
import { upload } from '../db/cloudinary.js';

// hàm upload file
const uploadImage = async (req, res, next) => {
    upload.single('img')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: "fail",
                message: "Error uploading avatar: " + err.message,
            });
        } else if (err) {
            return res.status(400).json({
                status: "fail",
                message: err.message,
            });
        }
        next();
    });
};

export { uploadImage };