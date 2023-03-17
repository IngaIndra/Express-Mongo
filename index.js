import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.router.js";

const PORT = 8080;
const MONGO_CONNECTION_STRING =
  "mongodb+srv://ingaindra99:bySHgKdE8UsJXzYd@cluster0.7rvbslr.mongodb.net/green";

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB", err);
  });

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
