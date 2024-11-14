import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        uid:{
            type:String,
            required:true,
            unique:true,
        },
        name:{
            type:String,
            required:true,
            min:2,
            max:50
        },
        email:{
            type:String,
            required:true,
            max:50,
            unique:true
        },
        password:{
            type:String,
            min:8,
            required:true,
        },
        city:String,
        state:String,
        country:String,
    },{
        timestamps:true
    }
)

const User = mongoose.model("User",userSchema);

export default User;
