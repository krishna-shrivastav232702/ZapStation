import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    quantity:{
        type:Number,
    }
},{timestamps:true});

const ConnectionType = mongoose.model("ConnectionType",connectionSchema);
export default ConnectionType;