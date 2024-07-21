const express = require("express");
require("dotenv").config()
const dataRouter = express.Router();

const Data = require("../models/data.model");
const authenticate = require("../middleware/auth.middleware");

dataRouter.post("/create", authenticate, async function (req, res) {
  try {
    const username = req.user.username;
    const { title, description, status } = req.body;
    const date = new Date();
    const data = await Data.create({
      username,
      title,
      description,
      status,
      Date: date,
    });
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

dataRouter.get("/all", authenticate, async function (req, res) {
  try {
    const username = req.user.username;
    const data = await Data.find({ username }).lean().exec();
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

dataRouter.delete("/:id", authenticate, async (req, res) => {
  try {
    const delitem = await Data.findByIdAndDelete(req.params.id);
    return res.status(200).send(delitem);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

dataRouter.patch("/:id", authenticate, async (req, res) => {
  try {
    const username=req.user.username
    const {title, description, status } = req.body;
    const itemId = req.params.id;
    const delitem = await Data.findByIdAndUpdate(itemId, {title, description, status,username }, {
      new: true,
    });
    return res.status(200).send(delitem);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = dataRouter;
