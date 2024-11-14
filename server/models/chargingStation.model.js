import mongoose from "mongoose";

const chargingStationSchema = new mongoose.Schema({
    uuid:{
        type:String,
        required:true,
        unique:true,
    },
    addressInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:true,
    },
    connectionType:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ConnectionType",
    }],
    numberOfPorts:{
        type:Number,  
    },
    slots: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChargingSlot",
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },

},{timestamps:true});

const ChargingStation = mongoose.model("ChargingStation",chargingStationSchema);

export default ChargingStation;