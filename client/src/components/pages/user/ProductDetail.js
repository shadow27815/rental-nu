import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@mui/material';

// กำหนด Container หลักสำหรับจัดตำแหน่งและจัดเรียงองค์ประกอบทั้งหมด
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* เพื่อจัดเรียงข้อความและกรอบให้อยู่ในแนวตั้ง */
    height: 100vh;
    background-color: #ffffff; 
`;

// กำหนดสไตล์สำหรับหัวข้อ "รายละเอียดพื้นที่"
const TitleContainer = styled.h2`
    font-size: 36px; /* ขนาดตัวอักษร */
    font-weight: bold;
    margin-bottom: 20px; /* ระยะห่างระหว่างข้อความและกรอบ */
`;

// กำหนดสไตล์สำหรับกล่องที่ใช้แสดงรายละเอียดพื้นที่
const ContentContainer = styled.div`
    display: flex;
    width: 80%;  
    max-width: 1000px;  
    border: 1px solid #ddd;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
`;

// กำหนดสไตล์สำหรับกล่องแสดงรูปภาพพื้นที่
const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px; /* เพิ่ม padding เพื่อสร้างระยะห่างระหว่างรูปกับกรอบ */
`;

// กำหนดสไตล์สำหรับรูปภาพพื้นที่
const Image = styled.img`
    width: 100%;  
    height: auto;
    object-fit: cover; 
`;

// กำหนดสไตล์สำหรับกล่องแสดงรายละเอียดพื้นที่
const DescriptionContainer = styled.div`
    flex: 2;  
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

// กำหนดสไตล์สำหรับแต่ละรายละเอียดของพื้นที่
const DescriptionItem = styled.div`
    margin-bottom: 20px;
    font-size: 20px; /* ปรับขนาดตัวหนังสือให้เล็กลง */
`;

// สไตล์สำหรับหัวข้อชื่อพื้นที่
const Title = styled.h1`
    font-size: 36px; 
    font-weight: bold;
`;

// สไตล์สำหรับปุ่ม
const ButtonContainer = styled.div`
    align-self: flex-end; 
    margin-top: auto;  
`;

const ProductDetail = () => {
    const { id } = useParams();  // รับค่า id จาก URL
    const navigate = useNavigate();  // ใช้สำหรับการนำทางเมื่อคลิกปุ่ม
    const [product, setProduct] = useState(null);  // เก็บข้อมูลพื้นที่ที่ดึงมา

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // ดึงข้อมูลพื้นที่จาก API โดยใช้ id ที่ได้จาก URL
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(response.data);  // เก็บข้อมูลพื้นที่ที่ดึงมาใน state
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();  // เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อ component ถูก mount
    }, [id]);  // ทำงานทุกครั้งเมื่อ id เปลี่ยนแปลง

    // ฟังก์ชันที่ทำงานเมื่อผู้ใช้คลิกปุ่มเช่า
    const handleRentClick = () => {
        navigate(`/tenant-form?product=${id}`);  // นำทางไปยังหน้าฟอร์มการเช่าพื้นที่
    };

    // ถ้ายังโหลดข้อมูลไม่เสร็จ
    if (!product) {
        return <div>Loading...</div>;  // แสดงข้อความ loading ระหว่างรอดึงข้อมูล
    }

    // กำหนดสีสำหรับสถานะพื้นที่
    const statusColor = product.status === 'ว่าง' ? 'green' : product.status === 'มีผู้เช่า' ? 'red' : 'orange';

    return (
        <Container>
            <TitleContainer>รายละเอียดพื้นที่</TitleContainer>
            <ContentContainer>
                {/* แสดงรูปภาพของพื้นที่ */}
                <ImageContainer>
                    <Image
                        alt={product.name}
                        src={`http://localhost:5000/uploads/${product.file}`}
                    />
                </ImageContainer>
                <DescriptionContainer>
                    {/* แสดงชื่อและรายละเอียดของพื้นที่ */}
                    <Title>{product.name}</Title>
                    <DescriptionItem>รายละเอียด: {product.detail}</DescriptionItem>
                    <DescriptionItem>สถานที่: {product.location}</DescriptionItem>
                    <DescriptionItem>ราคา: {product.price} บาท</DescriptionItem>
                    <DescriptionItem style={{ color: statusColor, fontWeight: 'bold' }}>
                        สถานะ: {product.status}
                    </DescriptionItem>
                    <ButtonContainer>
                        {/* ปุ่มเช่าพื้นที่ */}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#175bdb',
                                '&:hover': {
                                    backgroundColor: '#0741ae',
                                },
                                fontSize: '1rem'
                            }}
                            onClick={handleRentClick}
                            disabled={product.status !== 'ว่าง'}  // ปิดการทำงานถ้าสถานะไม่ใช่ 'ว่าง'
                        >
                            เช่าพื้นที่นี้
                        </Button>
                    </ButtonContainer>
                </DescriptionContainer>
            </ContentContainer>
        </Container>
    );
}

export default ProductDetail;
