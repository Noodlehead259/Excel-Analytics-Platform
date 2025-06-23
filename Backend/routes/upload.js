import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { uploadExcel } from '../controllers/uploadController.js';
const router = express.Router();
router.post('/', authenticate, uploadExcel);
export default router;
