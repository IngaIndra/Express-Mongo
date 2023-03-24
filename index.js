import express from "express";
import "./configs/mongoose-config.js";
import userRouter from "./routes/users.router.js";
// import todoCategoriesRouter from "./routes/todoCategories-router.js";
// import todoRouter from "./routes/todo-router.js";
import multer from "multer";
import { nanoid } from "nanoid";
import cloudinary from "cloudinary";
import cors from "cors";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    const fileName = nanoid();
    const splittedPath = file.originalname.split(".");
    const fileExtension = splittedPath[splittedPath.length - 1];
    cb(null, `${fileName}.${fileExtension}`);
  },
});

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
//   fileFilter: (req, file, cb) => {
//     const mimeType = file.mimetype;
//     const filterSize = req.headers["content-length"];
//     if (mimeType.includes("image") && filterSize <= 2 * 1024 * 1024) {
//       cb(null, true);
//     } else if (mimeType.includes("video") && filterSize <= 100 * 1024 * 1024) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// });

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
// app.use("/api/todo/categories", todoCategoriesRouter);
// app.use("/api/todo", todoRouter);

cloudinary.config({
  cloud_name: "df8az1u5k",
  api_key: "792374388872524",
  api_secret: "9TvZ89y4BmTTvNM5TY1Gyiasqtc",
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
