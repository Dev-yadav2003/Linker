import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const bufferStream = Readable.from(req.file.buffer);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "user_uploads",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      bufferStream.pipe(stream);
    });

    return res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
