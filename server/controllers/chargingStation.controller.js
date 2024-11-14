import Address from "../models/addressInfo.model.js";
import ChargingStation from "../models/chargingStation.model.js"
import axios from "axios";


const findNearByStations = async (lat, lng) => {
    try {
        const nearByAddress = await Address.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 15000
                }
            }
        }).limit(30);

        const stationIds = nearByAddress.map(address => address._id);
        const stations = await ChargingStation.find({ addressInfo: { $in: stationIds } });

        return stations;
    } catch (error) {
        console.log(`Error finding nearby stations : ${error.message}`);
        res.status(400).json({ message: error.message });
    }
}



export const getAllStations = async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }
        const api_key = process.env.OPEN_CAGE_API;
        const geoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?key=${api_key}&q=${encodeURIComponent(location)}&pretty=1&no_annotations=1`;

        const geoResponse = await axios.get(geoCodeUrl);
        const geoData = geoResponse.data.results[0];

        if (!geoData) {
            return res.status(404).json({ message: "Location not found" });
        }

        const { lat, lng } = geoData.geometry;
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
        const station = await ChargingStation.findById({_id:id });
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