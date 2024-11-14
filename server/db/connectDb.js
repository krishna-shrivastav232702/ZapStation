import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const mongourl = process.env.MONGO_URL;

export const connectDb = async ()=>{
    try{
        const connection = await mongoose.connect(mongourl);
        console.log(`Connection Successful :${connection.connection.host}`);
    }
    catch(err){
        console.error(`Error connecting to db ${err.message}`);
        process.exit(1);
    }
}
