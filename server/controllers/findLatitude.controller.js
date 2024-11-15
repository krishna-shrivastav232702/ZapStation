import Address from "../models/addressInfo.model.js";

const findLatitudes = async(req,res)=>{
        const {geodata,uuid}=req.query;
        if(!geodata){
            return res.status(400).json({message:"Latitude and longitude are not fetched"});
        }
        const response = await Address.findById({_id:geodata});
        console.log(response);
        const longitude =response.location[0];
        const latitude = response.location[1];
        console.log(longitude);
        console.log(latitude);
        res.status(200).json(response.location);

}

export default findLatitudes;