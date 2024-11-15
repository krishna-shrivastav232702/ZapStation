import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from "flowbite-react";
import { AuthContext } from '../../Context/AuthProvider';

const SingleStation = () => {
    const [station, setStation] = useState({});
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStation = async () => {
            try {
                const response = await axios.get(`http://localhost:7019/station/api/station/${id}`);
                setStation(response.data);
            } catch (error) {
                console.log("Error fetching particular station", error.message);
            }
        };
        fetchStation();
    }, [id]);

    const handleBookSlot = async (slotId) => {
        try {
            const response = await axios.post(`http://localhost:7019/slot/bookslot/${slotId}/${user.uid}`);
            alert(response.data.message); 
            navigate(`/bookSlot/:${slotId}/${user.uid}`);
        } catch (error) {
            console.error("Error booking slot:", error.message);
            alert("Failed to book the slot. Please try again.");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-pastelGreen'>
            <h1 className='text-3xl font-bold mt-8 mb-32'>Confirm Your Booking</h1>
            <div
                className={`grid gap-4 ${station.slots && station.slots.length === 1
                    ? "grid-cols-1 justify-center"
                    : station.slots && station.slots.length === 2
                        ? "grid-cols-2 justify-center"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
            >
                {station.slots && station.slots.length > 0 ? (
                    station.slots.map((slot, index) => (
                        <Card key={slot._id} className="max-w-sm rounded-3xl p-8">
                            <p>
                                <strong>Address:</strong> {station.addressInfo ? `${station.addressInfo.addressLine1}, ${station.addressInfo.addressLine2}` : "Loading..."}
                            </p>
                            <p>
                                <strong>Connection Type:</strong> {station.connectionType && station.connectionType.length > 0 ? station.connectionType[0].title : "Loading..."}
                            </p>
                            <p>
                                <strong>Quantity:</strong> {station.connectionType && station.connectionType.length > 0 ? station.connectionType[0].quantity : "Loading..."}
                            </p>
                            <p>
                                <strong>Slot Status:</strong> {slot.status}
                            </p>
                            {slot.status === 'available' ? (
                                <button
                                    onClick={() => handleBookSlot(slot._id)}
                                    className='bg-white font-black hover:bg-black hover:text-white  py-2 rounded-2xl transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105'
                                >
                                    Book Slot {index + 1}
                                </button>
                            ) : (
                                <p className='text-red-500'>Slot is {slot.status}</p>
                            )}
                        </Card>
                    ))
                ) : (
                    <p>No slots available</p>
                )}
            </div>
        </div>
    );
};

export default SingleStation;
