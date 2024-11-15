import express from "express"
import { getAllStations } from "../controllers/chargingStation.controller.js";
import { getParticularStation } from "../controllers/chargingStation.controller.js";
import findLatitudes from "../controllers/findLatitude.controller.js";


const router = express.Router();

router.get("/allStations",getAllStations);
router.get("/api/station/:id",getParticularStation);
router.get("/lat",findLatitudes);

export default router;
