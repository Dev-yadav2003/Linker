import express from "express";
import multer from "multer";
import { uploadFile } from "../controller/uploadController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFile);

export default router;
