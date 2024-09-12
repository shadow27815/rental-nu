import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    background-color: #f5f5f5;
`;

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
    position: relative; /* เพิ่มเพื่อจัดตำแหน่งปุ่ม */
`;

const ImageContainer = styled.div`
    flex: 1;
    max-width: 200px;
    overflow: hidden;
    margin-right: 20px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;

const Content = styled.div`
    flex: 2;
    padding-right: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 18px;
    color: #555;
    margin-bottom: 10px;
`;

const PriceContainer = styled.div`
    font-size: 28px;
    font-weight: bold;
    color: red;
    margin-bottom: 10px;
`;

const Status = styled.div`
    font-size: 20px;
    color: ${props => (props.status === 'ว่าง' ? 'green' : 'red')};
    font-weight: bold;
    margin-bottom: 10px;
`;

const VerticalDivider = styled.div`
    width: 1px;
    background-color: #ddd;
    margin: 0 20px;
    height: 100%; /* ทำให้เส้นแบ่งยาวเต็มที่ของ Card */
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: absolute; /* ทำให้ปุ่มยึดติดกับมุมขวาล่าง */
    bottom: 20px;
    right: 20px;
`;

const SpaceDetailPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/product`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleRentClick = (id) => {
        navigate(`/tenant-form?product=${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {products.map(product => (
                <CardContainer key={product.id}>
                    <ImageContainer>
                        <Image src={`http://localhost:5000/uploads/${product.file}`} alt={product.name} />
                    </ImageContainer>
                    <Content>
                        <InfoContainer>
                            <Title>{product.name}</Title>
                            <Description>รายละเอียด: {product.detail}</Description>
                            <Description>สถานที่: {product.location}</Description>
                            <PriceContainer>ราคา: {product.price} บาท</PriceContainer>
                            <Status status={product.status}>{product.status}</Status>
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
                            onClick={() => handleRentClick(product.id)}
                            disabled={product.status !== 'ว่าง'}
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
