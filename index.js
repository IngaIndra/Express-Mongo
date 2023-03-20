import express from "express";
import "./configs/mongoose-config.js";
import userRouter from "./routes/users.router.js";
import multer from "multer";
import { nanoid } from "nanoid";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "df8az1u5k",
  api_key: "792374388872524",
  api_secret: "9TvZ89y4BmTTvNM5TY1Gyiasqtc",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const mimeType = file.mimetype;
    // console.log("mimeType:", mimeType);
    // let dest = "";
    // if (mimeType.includes("image")) {
    //   dest += "/images";
    // } else if (mimeType.includes("video")) {
    //   dest += "/videos";
    // } else if (mimeType.includes("pdf")) {
    //   dest += "/docs";
    // } else if (mimeType.includes("audio")) {
    //   dest += "/audios";
    // } else {
    //   dest += "/others";
    // }
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
  // limits: {
  //   fileSize: 10 * 1024 * 1024 * 1024,
  // },
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

app.use("/api/users", userRouter);

app.post("/files", upload.single("image"), (req, res) => {
  // res.send(req.file);
  const uploadedFile = cloudinary.v2.uploader
    .upload(req.file.path)
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log("uploadedFile", e);
    });
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
