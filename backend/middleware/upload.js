// middleware/upload.js
import multer from 'multer';
import path from 'path';

// Specify the storage options for multer
const storage = multer.diskStorage({
  // Define where the uploaded file should be saved
  destination: (req, file, cb) => {
    cb(null, 'img/'); // The folder where files will be stored
  },
  // Define the file name format
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name with original extension
  }
});

// Create the multer upload instance with storage options
const upload = multer({ storage: storage });

export default upload;
