import express from "express";
import "dotenv/config";
import fs from "fs";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();
app.use(express.json());

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/api/upload", uploadRoute);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
