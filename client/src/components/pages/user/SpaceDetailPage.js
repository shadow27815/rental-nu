import React, { useEffect, useState } from 'react'; // นำเข้า React และ Hook ที่ใช้
import axios from 'axios'; // ใช้ axios สำหรับการเรียกข้อมูลจาก API
import styled from 'styled-components'; // ใช้ styled-components สำหรับการจัดการ CSS
import { Button } from '@mui/material'; // ใช้ปุ่มจาก Material UI
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับการนำทางไปยังหน้าต่างๆ

// สร้าง Container หลักที่ใช้จัดเรียงเนื้อหาแบบ flex และจัดให้อยู่ตรงกลาง
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: #f5f5f5;
`;

// สร้าง Card ที่ใช้แสดงแต่ละ product (พื้นที่)
const CardContainer = styled.div`
    display: flex;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    border: 1px solid #ddd;
    overflow: hidden;
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    position: relative; /* เพิ่มเพื่อจัดตำแหน่งปุ่มให้อยู่ในตำแหน่งที่ต้องการ */
`;

// จัดการส่วนของรูปภาพในแต่ละ product
const ImageContainer = styled.div`
    flex: 1;
    max-width: 200px;
    overflow: hidden;
    margin-right: 20px;
`;

// ตั้งค่ารูปภาพให้เต็มพื้นที่และจัดการ aspect ratio ให้คงที่
const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;

// จัดการส่วนเนื้อหาของ product
const Content = styled.div`
    flex: 2;
    padding-right: 20px;
`;

// จัดการแสดงข้อมูลของ product ในรูปแบบ column
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

// ตั้งค่าหัวข้อของ product เช่น ชื่อ
const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
`;

// จัดการข้อความอธิบายของ product
const Description = styled.p`
    font-size: 18px;
    color: #555;
    margin-bottom: 10px;
`;

// แสดงราคาของ product
const PriceContainer = styled.div`
    font-size: 28px;
    font-weight: bold;
    color: red;
    margin-bottom: 10px;
`;

// แสดงสถานะของ product เช่น ว่าง, มีผู้เช่า
const Status = styled.div`
    font-size: 20px;
    color: ${props => (props.status === 'ว่าง' ? 'green' : 'red')}; // กำหนดสีตามสถานะ
    font-weight: bold;
    margin-bottom: 10px;
`;

// เส้นแบ่งแนวตั้งระหว่างเนื้อหากับปุ่ม
const VerticalDivider = styled.div`
    width: 1px;
    background-color: #ddd;
    margin: 0 20px;
    height: 100%; // ทำให้เส้นแบ่งเต็มความสูงของ Card
`;

// Container สำหรับปุ่มที่จะจัดให้อยู่ที่มุมขวาล่าง
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: absolute; /* ทำให้ปุ่มยึดติดกับมุมขวาล่าง */
    bottom: 20px;
    right: 20px;
`;

// คอมโพเนนต์หลักของหน้าแสดงรายละเอียดพื้นที่
const SpaceDetailPage = () => {
    const [products, setProducts] = useState([]); // สร้าง state สำหรับเก็บข้อมูล product
    const [loading, setLoading] = useState(true); // สร้าง state สำหรับแสดงสถานะการโหลดข้อมูล
    const navigate = useNavigate(); // ใช้สำหรับการนำทางไปหน้าอื่น

    // ใช้ useEffect ในการเรียก API เพื่อดึงข้อมูลเมื่อ component ถูก mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/product`); // เรียก API เพื่อดึงข้อมูล product
                setProducts(response.data); // เก็บข้อมูลที่ได้รับใน state
            } catch (error) {
                console.error('Error fetching products:', error); // แสดง error หากมีปัญหา
            } finally {
                setLoading(false); // เมื่อดึงข้อมูลเสร็จแล้ว เปลี่ยนสถานะ loading เป็น false
            }
        };

        fetchProducts();
    }, []); // useEffect นี้จะทำงานแค่ครั้งแรกเมื่อ component ถูก mount

    // ฟังก์ชันสำหรับการนำทางไปหน้าฟอร์มการเช่าพื้นที่
    const handleRentClick = (id) => {
        navigate(`/tenant-form?product=${id}`); // นำทางไปยังหน้า tenant-form พร้อมส่ง id ของ product ไปด้วย
    };

    // หากข้อมูลยังโหลดไม่เสร็จ ให้แสดงข้อความ Loading...
    if (loading) {
        return <div>Loading...</div>;
    }

    // การแสดงผลเมื่อโหลดข้อมูลเสร็จ
    return (
        <Container>
            {products.map(product => ( // วนลูปแสดง product แต่ละตัว
                <CardContainer key={product.id}> {/* ใช้ key เพื่อให้ React จัดการการเรนเดอร์ได้อย่างถูกต้อง */}
                    <ImageContainer>
                        <Image src={`http://localhost:5000/uploads/${product.file}`} alt={product.name} /> {/* แสดงรูปภาพ */}
                    </ImageContainer>
                    <Content>
                        <InfoContainer>
                            <Title>{product.name}</Title> {/* แสดงชื่อ product */}
                            <Description>รายละเอียด: {product.detail}</Description> {/* แสดงรายละเอียด */}
                            <Description>สถานที่: {product.location}</Description> {/* แสดงสถานที่ */}
                            <PriceContainer>ราคา: {product.price} บาท</PriceContainer> {/* แสดงราคา */}
                            <Status status={product.status}>{product.status}</Status> {/* แสดงสถานะ */}
                        </InfoContainer>
                    </Content>
                    <VerticalDivider />
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#175bdb',
                                '&:hover': {
                                    backgroundColor: '#0741ae',
                                },
                                fontSize: '1rem',
                            }}
                            onClick={() => handleRentClick(product.id)} // เมื่อกดปุ่มจะเรียก handleRentClick
                            disabled={product.status !== 'ว่าง'} // ปุ่มจะถูก disabled หากสถานะไม่ใช่ 'ว่าง'
                        >
                            เช่าพื้นที่นี้
                        </Button>
                    </ButtonContainer>
                </CardContainer>
            ))}
        </Container>
    );
};

export default SpaceDetailPage;
