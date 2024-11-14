import User from "../models/user.model.js";


export const createUser = async(req,res)=>{
    const {name,email,password,city,state,country,uid}=req.body;
    try {
        const user = await User.findOne({uid});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = new User({uid,email,name,password,city,state,country});
        await newUser.save();
        console.log("User created Successfully");
        res.status(203).json({message:"User created Successfully"});
    } catch (error) {
        console.error(error?.message);
        res.status(401).json({message:"User not created"});
    }
}

export const getUser = async (req,res)=>{
    const {_id}= req.body;
    const user = await User.findById({_id});
    if(user){
        console.log("User Found");
        res.status(200).json(user);
    }else{
        console.log("User nonexistent");
        res.status(400).json({message:error.message});
    }
}