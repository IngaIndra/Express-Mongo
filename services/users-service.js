import { UserSchema } from "../models/UserModel.js";
import mongoose from "mongoose";

const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => {
  return UserModel.find({});
};

export const getUserById = async (id) => {
  return await userModel.findById(id);
};

export const createUser = async (user) => {
  return await UserModel.create(user);
};

export const updateUser = async (id, user) => {
  return await userModel.findByIdAndUpdate(id, user, { new: true });
};

export const deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
