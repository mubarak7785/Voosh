const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    username:{ type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String,enum :["To-do","Doing","Done"], required: true },
    Date: { type: Date, required: true },
  }, 
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("data", dataSchema);
