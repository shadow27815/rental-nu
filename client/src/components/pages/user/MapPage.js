import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';

// ตั้งค่าไอคอนของ Marker
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/spacedetail');
    };

    return (
        <div style={{ height: "calc(100vh - 64px)", width: "100%" }}> {/* ใช้ calc เพื่อลบความสูงของ AppBar */}
            <MapContainer center={[16.747655, 100.194993]} zoom={15} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[16.737458695318733, 100.19891968569895]}>
                    <Popup>
                        <img
                            src="/assets/nu111.jpg"
                            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                        />
                        <strong>โรงอาหารหอใน</strong><br />
                        <button
                            onClick={handleNavigate}
                            style={{
                                marginTop: '10px',
                                padding: '10px',
                                backgroundColor: '#175bdb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            ดูรายละเอียดพื้นที่นี้
                        </button>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapPage;
