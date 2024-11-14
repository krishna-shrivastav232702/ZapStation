import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./db/connectDb.js";
import bodyParser from "body-parser";
import cors from "cors";




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`app is listening at port : ${port}`);
});

