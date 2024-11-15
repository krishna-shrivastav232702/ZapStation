import Address from "../models/addressInfo.model.js";
import ChargingStation from "../models/chargingStation.model.js"
import axios from "axios";


const findNearByStations = async (lng, lat) => {
    try {
        const nearByAddress = await Address.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lat, lng]
                    },
                    $maxDistance: 15000
                }
            }
        }).limit(30);

        const stationIds = nearByAddress.map(address => address._id);
        const stations = await ChargingStation.find({ addressInfo: { $in: stationIds } })

        // const stationsWithCoordinates = stations.map(station => {
        //     const { lat, lng } = station.addressInfo.geometry; 
        //     return {
        //         _id: station._id,
        //         uuid: station.uuid,
        //         name: station.name,
        //         addressInfo: station.addressInfo,
        //         latitude:lat,
        //         longitude:lng,
        //     };
        // });

        // return stationsWithCoordinates;

        return stations;

        
    } catch (error) {
        console.log(`Error finding nearby stations : ${error.message}`);
        res.status(400).json({ message: error.message });
    }
}



export const getAllStations = async (req, res) => {
    try {
        console.log("inside getallstations");
        const { location } = req.query;
        console.log(location);
    
        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }
        const api_key = process.env.OPEN_CAGE_API;
        console.log("before geocode");
        const geoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?key=${api_key}&q=${encodeURIComponent(location)}&pretty=1&no_annotations=1`;
        // console.log(geoCodeUrl);
        const geoResponse = await axios.get(geoCodeUrl);
        const geoData = geoResponse.data.results[0];

        if (!geoData) {
            return res.status(404).json({ message: "Location not found" });
        }

        const { lng, lat } = geoData.geometry;
        const stations = await findNearByStations(lat, lng);
        return res.status(200).json(stations);

    } catch (error) {
        console.log(`error in finding stations:${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



export const getParticularStation = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await ChargingStation.findOne({uuid:id}).populate("addressInfo").populate("connectionType").populate("slots");
        console.log(station);
        if (!station) {
            console.log("Station not found");
            return res.status(404).json({ message: error.message });
        }
        return res.status(200).json(station);
    } catch (error) {
        console.log("Error fetching the station");
        return res.status(400).json({message:error.message});
    }

}