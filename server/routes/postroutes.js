import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../models/posts.js';

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const router=express.Router();

router.route('/').get(async(req,res)=>{
    try{
        const Posts=await Post.find({})

        res.status(201).json({success:true,data:Posts})

    }catch(err){
        res.status.json({success:false,message:err})

    }

})

router.route('/').post(async(req,res)=>{
    try{
        const {name,prompt,photo}=req.body;

    const photoUrl=await cloudinary.uploader.upload(photo);

    const newPost=await Post.create({
        name,
        prompt,
        photo:photoUrl.url
    })
    res.status(201).json({success:true,data:newPost});

    }catch(err){
        res.status(500).json({success:false,message:err})

    }
    
})


export default router;