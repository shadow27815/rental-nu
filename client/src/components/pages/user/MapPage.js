import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // นำเข้า component ที่จำเป็นสำหรับการสร้างแผนที่
import 'leaflet/dist/leaflet.css'; // นำเข้า stylesheet ของ Leaflet เพื่อให้แผนที่ถูกแสดงอย่างถูกต้อง
import L from 'leaflet'; // นำเข้าไลบรารี Leaflet สำหรับตั้งค่าเพิ่มเติม
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate สำหรับการนำทางไปยังหน้าต่างๆ

// ตั้งค่าไอคอนของ Marker
delete L.Icon.Default.prototype._getIconUrl; // ลบการตั้งค่าเดิมของการเรียก URL ไอคอน Marker

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), // กำหนด URL สำหรับไอคอนความละเอียดสูง
    iconUrl: require('leaflet/dist/images/marker-icon.png'), // กำหนด URL สำหรับไอคอน Marker ปกติ
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // กำหนด URL สำหรับเงาของ Marker
});

const MapPage = () => {
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อสร้างฟังก์ชันสำหรับการนำทางไปหน้าอื่น

    const handleNavigate = () => {
        navigate('/spacedetail'); // เมื่อเรียกใช้ฟังก์ชันนี้จะนำทางไปที่หน้า '/spacedetail'
    };

    return (
        <div style={{ height: "calc(100vh - 64px)", width: "100%" }}> {/* ใช้ calc เพื่อลบความสูงของ AppBar ออกจากหน้าจอทั้งหมด */}
            <MapContainer
                center={[16.747655, 100.194993]} // กำหนดพิกัดกลางของแผนที่ (พิกัด Naresuan University)
                zoom={15} // กำหนดระดับการ zoom เริ่มต้นของแผนที่
                style={{ height: "100%", width: "100%" }} // กำหนดให้แผนที่เต็มพื้นที่ div ทั้งหมด
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // กำหนด URL ของ Tile Layer สำหรับการดึงข้อมูลแผนที่จาก OpenStreetMap
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // ให้เครดิตกับ OpenStreetMap
                />
                <Marker position={[16.737458695318733, 100.19891968569895]}> {/* วาง Marker ที่พิกัดของ NU Square */}
                    <Popup> {/* เมื่อคลิกที่ Marker จะมี Popup ปรากฏขึ้น */}
                        <img
                            src="/assets/nusq.jpg" // แสดงภาพภายใน Popup
                            style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                        />
                        <strong>ศูนย์อาหาร NU SQUARE</strong><br /> {/* ชื่อสถานที่ใน Popup */}
                        <button
                            onClick={handleNavigate} // เมื่อกดปุ่มนี้จะเรียกใช้ฟังก์ชัน handleNavigate เพื่อไปหน้ารายละเอียดพื้นที่
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
