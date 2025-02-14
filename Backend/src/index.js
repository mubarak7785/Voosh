const express = require("express");
const cors = require("cors");
require("dotenv").config()
const connect = require("./config/db");
const dataRouter = require("./controllers/data.controller");
const { userRouter } = require("./controllers/user.controller");
const app = express();
app.use(cors());
const port = process.env.PORT || 2554;
app.use(express.json());

app.use("/data", dataRouter);

app.use("/user", userRouter);

app.listen(port, async function (req, res) {
  try {
    await connect();
    console.log(`Listening port ${port}`);
  } catch (err) {
    console.log(err.message);
  }
});
