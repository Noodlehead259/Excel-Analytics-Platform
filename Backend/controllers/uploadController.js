import multer from 'multer';
import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

export const uploadExcel = [
  upload.single('file'),
  async (req, res) => {
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    // store or process data, e.g., save to Mongo
    // For demo, return data
    res.json({ data, count: data.length });
    fs.unlinkSync(filePath);
  }
];
