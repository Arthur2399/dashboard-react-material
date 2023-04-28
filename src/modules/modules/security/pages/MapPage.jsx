import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export const MapPage = () => {
    const [latitud, setLatitud] = useState(51.505);
    const [longitud, setLongitud] = useState(-0.09);

    return (
        <Box sx={{
            height: '500px',
            width: '500px',
            margin: 'auto',
        }}>
            <MapContainer center={[latitud, longitud]} zoom={13}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[latitud, longitud]}>
                    <Popup>
                        Marcador en ({latitud.toFixed(3)}, {longitud.toFixed(3)})
                    </Popup>
                </Marker>
            </MapContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setLatitud(51.505 + Math.random() * 0.1);
                    setLongitud(-0.09 + Math.random() * 0.1);
                }}
            >
                Mover marcador
            </Button>
        </Box>
    );
}