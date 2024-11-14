import express from "express"
import {getAvailableSlots,bookSlot,modifySlot,deleteSlot} from "../controllers/chargingSlot.controller.js"


const router = express.Router();

router.get("/allSlots/:id",getAvailableSlots);
router.post("/bookslot/:slotId/:userId",bookSlot);
router.put("/modifySlot/:slotId", modifySlot);  
router.delete("/deleteSlot/:slotId", deleteSlot);  


export default router;
