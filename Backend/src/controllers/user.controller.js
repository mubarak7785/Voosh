const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password,username ,role} = req.body;
  try {
    const useremail = await User.findOne({ email });
    const userName = await User.findOne({ username });

    if (useremail || userName) {
      return res.status(400).json({ message: "User already exist " });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const userdata = new User({ name, email, password: hashpassword ,username,role});

    await userdata.save();
    res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while registering", error });
  }
});

userRouter.post("/login",async (req, res)=>{
    const {emailOrUsername,password}=req.body
    try{
        const user=await User.findOne({$or:[{email:emailOrUsername},{username:emailOrUsername}]})

        if(!user){
            return res.status(404).json({ message: "User not Found" });
        }
        const validpass=await bcrypt.compare(password,user.password)

        if(!validpass){
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token=jwt.sign({userId:user._id,username:user.username,role:user.role},process.env.SECRETKEY,{expiresIn:"1h"})

        res.status(201).json({message:"Login successfull",token})

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error while Login", error });
    }
})

module.exports={userRouter}