import React from 'react';
import { Card } from 'antd';  // ใช้ Card จาก Ant Design เพื่อแสดงข้อมูลพื้นที่ในรูปแบบการ์ด
import { useNavigate } from 'react-router-dom';  // ใช้สำหรับการนำทางเมื่อผู้ใช้คลิกที่การ์ด

const { Meta } = Card;  // Meta เป็นส่วนหนึ่งของ Card ใน Ant Design ใช้สำหรับแสดงหัวเรื่องและรายละเอียด

const SpaceCard = ({ data }) => {
    const navigate = useNavigate();  // สร้างฟังก์ชัน navigate สำหรับนำทางไปยังหน้าอื่น

    // ฟังก์ชันที่ทำงานเมื่อผู้ใช้คลิกที่การ์ด
    const handleCardClick = () => {
        if (data.id) {  // ตรวจสอบว่ามี id ของพื้นที่หรือไม่
            navigate(`/product/${data.id}`);  // นำทางไปยังหน้ารายละเอียดของพื้นที่นั้น โดยใช้ id
        } else {
            console.error('ID is undefined for product:', data);  // ถ้าไม่มี id ให้แสดงข้อผิดพลาดใน console
        }
    };

    // กำหนดสีสำหรับสถานะพื้นที่: ว่าง = เขียว, มีผู้เช่า = แดง, อื่นๆ = ส้ม
    const statusColor = data.status === 'ว่าง' ? 'green' : data.status === 'มีผู้เช่า' ? 'red' : 'orange';

    return (
        <Card
            onClick={handleCardClick}  // เมื่อคลิกที่การ์ดจะเรียกฟังก์ชัน handleCardClick
            style={{
                width: 300,  // กำหนดความกว้างของการ์ด
                margin: 'auto',  // ตั้งการ์ดให้อยู่กึ่งกลาง
                cursor: 'pointer',  // เปลี่ยนลูกศรเมาส์เมื่อ hover บนการ์ด
                minHeight: 400,  // ความสูงขั้นต่ำของการ์ด
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',  // จัด layout ภายในการ์ดให้มีระยะห่างสม่ำเสมอ
                borderRadius: '10px',  // ทำให้การ์ดมีขอบโค้งมน
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'  // เพิ่มเงาใต้การ์ดเพื่อให้ดูยกระดับ
            }}
            cover={  // รูปภาพที่จะปรากฏด้านบนของการ์ด
                data.file && (  // ตรวจสอบว่ามีไฟล์รูปภาพหรือไม่
                    <img
                        alt={data.name}  // ใส่ alt text สำหรับรูปภาพ
                        src={`http://localhost:5000/uploads/${data.file}`}  // ลิงก์ไปยังรูปภาพที่อยู่ในเซิร์ฟเวอร์
                        style={{
                            width: '100%',
                            height: 200,  // กำหนดความสูงของรูปภาพ
                            objectFit: 'cover',  // ทำให้รูปภาพเต็มพื้นที่โดยไม่เสียอัตราส่วน
                            borderRadius: '10px 10px 0 0'  // ทำให้ขอบบนของรูปภาพโค้งมน
                        }}
                    />
                )
            }
        >
            <Meta
                title={<div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{data.name}</div>}  // แสดงชื่อพื้นที่
                description={  // แสดงรายละเอียดต่าง ๆ ของพื้นที่
                    <>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>รายละเอียด: {data.detail}</div>  {/* รายละเอียดพื้นที่ */}
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>สถานที่: {data.location}</div>  {/* สถานที่ตั้งของพื้นที่ */}
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>ราคา: {data.price} บาท</div>  {/* ราคาเช่าพื้นที่ */}
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: statusColor }}>  {/* แสดงสถานะของพื้นที่ */}
                            สถานะ: {data.status}
                        </div>
                    </>
                }
            />
        </Card>
    );
}

export default SpaceCard;
