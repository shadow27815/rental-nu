import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const SpaceCard = ({ data }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (data.id) {
            navigate(`/product/${data.id}`);
        } else {
            console.error('ID is undefined for product:', data);
        }
    };

    const statusColor = data.status === 'ว่าง' ? 'green' : data.status === 'มีผู้เช่า' ? 'red' : 'orange';

    return (
        <Card
            onClick={handleCardClick}
            style={{
                width: 300,
                margin: 'auto',
                cursor: 'pointer',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
            cover={
                data.file && (
                    <img
                        alt={data.name}
                        src={`http://localhost:5000/uploads/${data.file}`}
                        style={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: '10px 10px 0 0'
                        }}
                    />
                )
            }
        >
            <Meta
                title={<div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{data.name}</div>}
                description={
                    <>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>รายละเอียด: {data.detail}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>สถานที่: {data.location}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>ราคา: {data.price} บาท</div>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: statusColor }}>
                            สถานะ: {data.status}
                        </div>
                    </>
                }
            />
        </Card>
    );
}

export default SpaceCard;
