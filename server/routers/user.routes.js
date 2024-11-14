import express from "express"
import {getUser} from "../controllers/user.controller.js";
import { createUser } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/createUser",createUser);
router.get("/getUser",getUser);

export default router;