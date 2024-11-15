import React from 'react'
import axios from "axios"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css"

const Map = () => {

    const markers=[
        {
            id:1,
            geocode:[12.9719, 77.6092],
            popup:"Hello,I am popup"
        },

        {
            id:2,
            geocode:[12.9762, 77.5922],
            popup:"Hello,I am popup"
        },
        {
            id:3,
            geocode:[12.9980, 77.5929],
            popup:"Hello,I am popup"
        },
    ]


    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
        iconSize: [34, 34]
    })

    return (
        <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ marginLeft: 400, marginTop: 150 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                markers.map((marker) => (
                    <Marker  key={marker.id} position={marker.geocode} icon={customIcon}>
                        <Popup><h2>{marker.popup}</h2></Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    )
}

export default Map