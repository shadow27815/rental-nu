import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SpaceCard from '../card/SpaceCard';  // คอมโพเนนต์สำหรับแสดงข้อมูลแต่ละพื้นที่

const CategoryGrid = ({ products, hasResults }) => {
    // ถ้าไม่มีผลลัพธ์จากการค้นหา (ไม่มีพื้นที่ที่ตรงกับคำค้นหา)
    if (!hasResults) {
        return (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                    ไม่พบพื้นที่ที่ค้นหา  {/* ข้อความเมื่อไม่มีข้อมูล */}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '20px' }}>
            {/* วนลูปเพื่อแสดงข้อมูลพื้นที่ตามสถานที่ */}
            {Object.keys(products).map((location, index) => (
                <Box key={index} sx={{ marginBottom: '40px', textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{ marginBottom: '30px', color: '#333', lineHeight: '1.2' }}
                    >
                        {location}  {/* แสดงชื่อสถานที่ */}
                    </Typography>
                    <Grid container spacing={4}>
                        {/* วนลูปเพื่อแสดงพื้นที่ภายในสถานที่นั้น ๆ */}
                        {products[location].map((product, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <SpaceCard data={product} />  {/* แสดงข้อมูลพื้นที่ในแต่ละการ์ด */}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default CategoryGrid;
