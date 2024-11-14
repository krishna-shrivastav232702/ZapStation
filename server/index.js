import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/connectDb.js";
import bodyParser from "body-parser";
import cors from "cors";
import fetchAndStoreChargingStations from "../server/data/data.js"
import userRoutes from "./routers/user.routes.js"
import stationRoutes from "./routers/chargingStation.routes.js"
import slotRoutes from "./routers/chargingSlot.routes.js"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDb();
// fetchAndStoreChargingStations();

const port = process.env.PORT;


app.use("/user",userRoutes);
app.use("/station",stationRoutes);
app.use("/slot",slotRoutes);

app.listen(port,()=>{
    console.log(`app is listening at port : ${port}`);
});

