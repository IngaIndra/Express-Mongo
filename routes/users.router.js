import { Router } from "express";
import { getUsers, createUser, deleteUser } from "../services/users-service.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await getUsers());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getUserById(id));
});

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    res.json(await createUser(user));
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params.id;
  const user = req.body;
  res.json(await updateUser(id, user));
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await deleteUser(id));
});

export default router;
