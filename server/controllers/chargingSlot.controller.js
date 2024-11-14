import ChargingSlot from "../models/chargingSlot.model.js"
import User from "../models/user.model.js";

export const getAvailableSlots =  async(req,res)=>{
    try {
        const {chargingStationId} = req.params;

        const query = {
            status:'available',
        };

        if(chargingStationId){
            query.chargingStation = chargingStationId;
        }

        const availableSlots = await ChargingSlot.find(query).populate('chargingStation','uuid addressInfo').populate('bookedBy','name email').exec();

        if(availableSlots.length === 0){
            return res.status(404).json({message:'No available slots found'});
        }

        return res.status(200).json(availableSlots);

        
    } catch (error) {
        console.error(`Error getting slots:${error.message}`);
        return res.status(500).json({message:"Internal Server error"});
    }
}

export const bookSlot = async (req,res)=>{
    try{
        const {slotId,userId} = req.params;

        const slot = await ChargingSlot.findById(slotId).populate('chargingStation');

        if(!slot){
            return res.status(404).json({message:"charging station not found"});
        }

        if(slot.status !== 'available'){
            return req.status(400).json({message:"Slot is booked or reserved"});
        }

        const user = await User.findById({_id:userId});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        slot.status="booked";
        slot.bookedBy=user._id;
        slot.bookingTime = new Date();

        await slot.save();

        return res.status(200).json({
            message:"Slot booked Successfully",
            slot:{
                _id:slot._id,
                status:slot.status,
                bookedBy:user.name,
                bookingTime:slot.bookingTime,
                chargingStation:{
                    uuid:slot.chargingStation.uuid,
                }

            }
        })

    }catch(error){
        console.error(`Error booking slot :${error.message}`);
        return req.status(500).json({message:"Internal Server error while booking slot"});
    }
}

export const modifySlot = async (req, res) => {
    try {
        const { slotId } = req.params;  

        
        const slot = await ChargingSlot.findById(slotId).populate('chargingStation');
        
        if (!slot) {
            return res.status(404).json({ message: "Charging slot not found" });
        }

        if (slot.status === 'reserved' && !slot.reservedUntil) {
            slot.reservedUntil = new Date(Date.now() + 2 * 60 * 60 * 1000); 
        }

        if (slot.status !== 'booked') {
            slot.status = 'reserved'; 
        }

        
        await slot.save();

        
        return res.status(200).json({
            message: "Slot modified successfully",
            slot: {
                _id: slot._id,
                status: slot.status,
                reservedUntil: slot.reservedUntil,
                bookingTime: slot.bookingTime,
                chargingStation: {
                    uuid: slot.chargingStation.uuid,  
                }
            }
        });
        
    } catch (error) {
        console.error(`Error modifying slot: ${error.message}`);
        return res.status(500).json({ message: "Internal Server error while modifying slot" });
    }
};


export const deleteSlot = async(req,res)=>{
    try {
        const {slotId} = req.params;

        const slot = await ChargingSlot.findByIdAndDelete(slotId);

        if(!slot){
            return res.status(404).json({message:"Charging Slot not found"});
        }

       

       return res.status(200).json({message:"Slot deleted Successfully"});

    } catch (error) {
        console.log(`Error deleting the slot : ${error.message}`);
        res.status(500).json({message:"Internal Server Error while deleting the slot"})
    }
}