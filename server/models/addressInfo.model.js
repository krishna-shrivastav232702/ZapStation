import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String
    },
    town:{
        type:String,
    },
    stateOrProvince:{
        type:String,
    },
    location: { 
        type: [Number], 
        required: true,
        index: '2dsphere', 
    },
},{timestamps:true});



const Address = mongoose.model("Address",addressSchema);

export default Address;