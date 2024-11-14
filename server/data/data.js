import axios from "axios"
import Address from "../models/addressInfo.model.js"
import ConnectionType from "../models/connectionType.model.js"
import ChargingStation from "../models/chargingStation.model.js"
import ChargingSlot from "../models/chargingSlot.model.js"
import dotenv from "dotenv"

dotenv.config();
const fetchAndStoreChargingStations = async () => {
    try {
        const response = await axios.get(process.env.OPEN_CHARGE_MAP_URL);
        const stations = response.data;
        console.log("stations created");

        for (const data of stations) {
            const { AddressInfo, NumberOfPoints, Connections, UUID } = data;

           console.log("creating address");
            const address = await Address.create({
                title: AddressInfo.Title,
                addressLine1: AddressInfo.AddressLine1,
                addressLine2: AddressInfo.AddressLine2,
                town: AddressInfo.Town,
                stateOrProvince: AddressInfo.StateOrProvince || "",
                location: [AddressInfo.Longitude, AddressInfo.Latitude],
            });

            console.log("Address Created");
            
            const connectionPromises = Connections.map(async (connection) => {
                return await ConnectionType.create({
                    title: connection.ConnectionType.Title,
                    quantity: connection.Quantity,
                });
            });

            const connectionTypes = await Promise.all(connectionPromises);
            console.log("connection types created");

            
            const chargingStation = await ChargingStation.create({
                uuid: UUID,
                numberOfPorts: NumberOfPoints,
                addressInfo: address._id,
                connectionType: connectionTypes.map(conn => conn._id),
            });

            console.log("charging station created");
            
            const slotPromises = [];
            for (let i = 0; i < NumberOfPoints; i++) {
                slotPromises.push(
                    ChargingSlot.create({
                        chargingStation: chargingStation._id,
                        status: 'available', 
                    })
                );
            }

            const slots = await Promise.all(slotPromises);
            chargingStation.slots = slots.map(slot => slot._id);
            await chargingStation.save();

            console.log(`Charging station ${chargingStation.uuid} and slots created successfully`);
        }

        console.log("All data is in database");
    } catch (error) {
        console.error(`Error while fetching data: ${error.message}`);
    }
}

export default fetchAndStoreChargingStations;