import React, { useState, useEffect } from 'react';
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { Link, useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import { useLocation } from 'react-router-dom';

const Map = () => {
    const [location, setLocation] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [stations, setStations] = useState([]);
    const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); 
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();

    const ChangeMapCenter = ({ center }) => {
        const map = useMap(); 
        useEffect(() => {
            map.setView(center); 
        }, [center]);
        return null;
    };

    useEffect(() => {
        const loc = query.get("location");
        if (loc && loc !== location) {
            setLocation(loc);
            updateMapData(loc); 
        }
    }, [query, location]);

    const updateMapData = async (location) => {
        try {
            await fetchStations(location);  
            await fetchGeocode(location);   
        } catch (error) {
            console.error("Error updating map data:", error);
        }
    };

    const fetchStations = async (location) => {
        try {
            const response = await axios.get("http://localhost:7019/station/allStations", {
                params: { location },
            });
            const stationsData = response.data;
            const stationMarkers = [];

            for (const station of stationsData) {
                const uuid = station.uuid;
                const geodata = station.addressInfo;
                try {
                    const geoRes = await axios.get("http://localhost:7019/station/lat", {
                        params: { geodata },
                    });

                    stationMarkers.push({
                        id: uuid || Date.now(),
                        geocode: [geoRes.data[1], geoRes.data[0]],
                        popup: station.name || "Station",
                    });
                } catch (geoError) {
                    console.error(`Error fetching geolocation for station ${station.id}:`, geoError);
                }
            }

            setStations(stationMarkers);
        } catch (error) {
            console.error("Error fetching stations", error);
        }
    };

    const fetchGeocode = async (location) => {
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: location,
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "ZapStation (krishnashrivastava23@gmail.com)",
                },
            });

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setMapCenter([lat, lon]); 
            }
        } catch (error) {
            console.error("Error fetching geocode:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (location) {
            navigate(`?location=${location}`);
            updateMapData(location);
        } else {
            console.error("Location is required!");
        }
    };

    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        navigate(`?location=${newLocation}`);
        updateMapData(newLocation); 
    };

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
        iconSize: [34, 34],
    });

    return (
        <div className='flex min-h-screen'>
            <div className='flex items-center justify-evenly'>
                <form onSubmit={handleSubmit} className="space-y-6 w-96 ml-20">
                    <h1 className='font-bold text-3xl mb-20'>Reserve your ZapSlot now</h1>
                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-black mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Enter your location"
                            className="p-5 bg-transparent text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            value={location}
                            onChange={handleLocationChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="timeSlot" className="text-black mb-1">Select Time Slot</label>
                        <select
                            id="timeSlot"
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            name="timeSlot"
                            className="p-5 bg-transparent text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        >
                            <option value="">--Time Slots--</option>
                            <option value="08:00 - 10:00">08:00 - 10:00</option>
                            <option value="10:01 - 12:00">10:01 - 12:00</option>
                            <option value="12:01 - 14:00">12:01 - 14:00</option>
                            <option value="14:01 - 16:00">14:01 - 16:00</option>
                            <option value="16:01 - 18:00">16:01 - 18:00</option>
                            <option value="18:01 - 20:00">18:01 - 20:00</option>
                            <option value="20:01 - 22:00">20:01 - 22:00</option>
                            <option value="22:01 - 00:00">22:01 - 00:00</option>
                        </select>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-white font-bold hover:bg-black hover:text-white px-6 py-3 rounded-2xl transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: "50%",
                        height: "80vh",
                        marginTop: "90px",
                        marginRight: "80px",
                        marginBottom: "80px",
                        zIndex: 1000,
                        borderRadius: "10px 0 0 10px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeMapCenter center={mapCenter} />
                    {
                        stations.map((station) => (
                            <Marker key={station.id} position={station.geocode} icon={customIcon}>
                                <Popup>
                                    <div>
                                        <h3>{station.popup}</h3>
                                        <Link to={`/map/${station.id}`} className="text-blue-500 hover:underline">
                                            View Station Details
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
