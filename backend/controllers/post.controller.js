import Notification from "../models/notifications.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req,res) => {
    try{
        const {text} = req.body;
        let {img} = req.body;

        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"})

        if(!text && !img){
            return res.status(400).json({message: "Please enter text or image"})
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url;
        }
        const newPost = new Post({
            user:userId,
            text,
            img,
        })

        await newPost.save();
        res.status(201).json(newPost);


    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in createPost controller",error);
    }
}

export const deletePost = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({message: "Post not found"})

        if(post.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "You are not authorized to delete this post"});
        }

        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post deleted successfully"});

    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in deletePost controller",error);
    }
}

export const commentOnPost = async (req,res) => {
    try{
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            return res.status(400).json({message: "Please enter a comment"});
        }
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        const comment = { user: userId, text };
        await post.save();

        res.status(200).json(post);

    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in commentOnPost controller",error);
    }
}

export const likeUnlikePost = async (req,res) => {
    try{
        const userId = req.user._id;
        const {id:postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost){
            await Post.updateOne({_id:postId}, {$pull: {likes:userId}});
            await User.updateOne({_id:userId}, {$pull:{likedPosts: postId}});
            res.status(200).json({message:"Post unliked Successfully."})
        }else{
            post.likes.push(userId);
            await User.updateOne({_id: userId}, {$push : {likedPosts: postId}});
            await post.save();

            const notification = new Notification({
                from: userId,
                to : post.user,
                type: "like"
            })
            await notification.save();
            res.status(200).json({message:"Post liked Successfully."})
        }  

    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in likeUnlikePost controller",error);
    }
}

export const gettAllPosts = async (req,res) => {
    try{
        const posts = await Post.find().sort({createdAt : -1})
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select:"-password,-email",
        });

        if(posts.length === 0){
            return res.status(404).json([]);
        }
        res.status(200).json(posts);

    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in gettAllPosts controller",error);
    }
}

export const getLikedPosts = async (req,res) => {
    const userId = req.params.id;
    try{
       const user = await User.findById(userId);
       if(!user) return res.status(404).json({error: "User not found"});
       
       const likedPosts = await Post.find({_id: {$in : user.likedPosts}})
       .populate({
        path: "user",
        select: "-password",
       })
       .populate({
        path: "comments.user",
        select:"-password,-email",
       });

       res.status(200).json(likedPosts);

    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in getLikedPosts controller",error);
    }
}