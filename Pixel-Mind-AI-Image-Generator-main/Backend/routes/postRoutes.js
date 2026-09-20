import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

import dotenv, { config } from "dotenv";
dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET
router.get("/",async (req, res) => {

try {
    
const posts= await Post.find({})
res.status(200).json({ posts });


} catch (error) {
    res.status(500).json({ error: error.message });
    
}

});

//POST
router.post("/",async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(201).json({ Message: "New post has been created", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
