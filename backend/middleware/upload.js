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

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); 
    } else {
      cb(new Error('Only image files are allowed!'), false); 
    }
  }
});

export default upload;
