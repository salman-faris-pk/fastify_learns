import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
  },
  { timestamps: true }
);


const User=mongoose.model("User", UserSchema);


export default User;