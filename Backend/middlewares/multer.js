import multer from 'multer'

const storage = multer.memoryStorage(); // ✅ required for buffer upload
const upload = multer({ storage });

export default upload;
