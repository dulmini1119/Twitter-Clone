import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req,res) => {
    try{
        const {fullname,username,email,password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email address."});
        }

        const existingUser = await UserActivation.findOne({username});
        if(existingUser){
            return res.status(400).json({error: 'username is already taken'});
        }
        const existingEmail = await UserActivation.findOne({email});
        if(existingEmail){
            return res.status(400).json({error: 'email is already taken'});
        }

        if(password.length<6){
            return res.status(400).json({error: 'Password must be at least 6 characters'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser,_id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                email:newUser.email,
                followers:newUser.followers,
                following:newUser.following,
                profileImg:newUser.profileImg,
                coverImg:newUser,coverImg,
                });
            
        }else{
            res.status(400).json({error:"Invalid user data."});
        }
        
    }catch(error){

    }
    
}

export const login = async (req,res) => {
    res.json({
        data: "You hit the login endpoint",
    });
}

export const logout = async (req,res) => {
    res.json({
        data: "You hit the logout endpoint",
    });
}