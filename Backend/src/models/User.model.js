const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    username: { type: String, required: true, unique:true },
    role:{type: String,enum:["user","admin"], default:"user"},
    password: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now,
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const User= mongoose.model("user", userSchema);

module.exports = User;
