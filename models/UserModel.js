import mongoose from "mongoose";

export const User = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  createdAt: Date,
  updatedAt: Date,
};

export const UserSchema = new mongoose.Schema(User, { timestamps: true });
