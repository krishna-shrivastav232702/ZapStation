import express from "express"
import { getAllStations } from "../controllers/chargingStation.controller.js";
import { getParticularStation } from "../controllers/chargingStation.controller.js";


const router = express.Router();

router.get("/allStations",getAllStations);
router.get("/api/station/:id",getParticularStation);

export default router;
