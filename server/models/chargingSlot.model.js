import mongoose from "mongoose";

const chargingSlotSchema = new mongoose.Schema(
    {
        chargingStation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChargingStation",
            required: true,
        },
        status: {
            type: String,
            enum: ['available', 'booked', 'reserved'],
            default: 'available',
        },
        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        },
        bookingTime: {
            type: Date,
        },
        reservedUntil: {
            type: Date,
        },
    },
    {
        timestamps: true, 
    }
);

const ChargingSlot = mongoose.model("ChargingSlot", chargingSlotSchema);

export default ChargingSlot;
