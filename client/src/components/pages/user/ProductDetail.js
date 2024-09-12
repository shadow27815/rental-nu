import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@mui/material';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* เพื่อจัดเรียงข้อความและกรอบให้อยู่ในแนวตั้ง */
    height: 100vh;
    background-color: #ffffff; 
`;

const TitleContainer = styled.h2`
    font-size: 36px; /* ขนาดตัวอักษร */
    font-weight: bold;
    margin-bottom: 20px; /* ระยะห่างระหว่างข้อความและกรอบ */
`;

const ContentContainer = styled.div`
    display: flex;
    width: 80%;  /* ทำให้พื้นที่แสดงผลแคบลง */
    max-width: 1000px;  /* ทำให้พื้นที่แสดงผลแคบลง */
    border: 1px solid #ddd;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px; /* เพิ่ม padding เพื่อสร้างระยะห่างระหว่างรูปกับกรอบ */
`;

const Image = styled.img`
    width: 100%;  /* ให้รูปภาพปรับขนาดตาม Container */
    height: auto;
    object-fit: cover; 
`;

const DescriptionContainer = styled.div`
    flex: 2;  
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

const DescriptionItem = styled.div`
    margin-bottom: 20px;
    font-size: 20px; /* ปรับขนาดตัวหนังสือให้เล็กลง */
`;

const Title = styled.h1`
    font-size: 36px; /* ปรับขนาดตัวหนังสือให้เล็กลง */
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    align-self: flex-end; /* ทำให้ปุ่มไปอยู่ขวาล่าง */
    margin-top: auto;  /* ดันปุ่มไปด้านล่าง */
`;

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleRentClick = () => {
        navigate(`/tenant-form?product=${id}`);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const statusColor = product.status === 'ว่าง' ? 'green' : product.status === 'มีผู้เช่า' ? 'red' : 'orange';

    return (
        <Container>
            <TitleContainer>รายละเอียดพื้นที่</TitleContainer>
            <ContentContainer>
                <ImageContainer>
                    <Image
                        alt={product.name}
                        src={`http://localhost:5000/uploads/${product.file}`}
                    />
                </ImageContainer>
                <DescriptionContainer>
                    <Title>{product.name}</Title>
                    <DescriptionItem>รายละเอียด: {product.detail}</DescriptionItem>
                    <DescriptionItem>สถานที่: {product.location}</DescriptionItem>
                    <DescriptionItem>ราคา: {product.price} บาท</DescriptionItem>
                    <DescriptionItem style={{ color: statusColor, fontWeight: 'bold' }}>
                        สถานะ: {product.status}
                    </DescriptionItem>
                    <ButtonContainer>
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
