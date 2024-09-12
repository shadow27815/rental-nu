import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SpaceCard from '../card/SpaceCard';

const CategoryGrid = ({ products, hasResults }) => {
    if (!hasResults) {
        return (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                    ไม่พบพื้นที่ที่ค้นหา
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: '20px' }}>
            {Object.keys(products).map((location, index) => (
                <Box key={index} sx={{ marginBottom: '40px', textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{ marginBottom: '30px', color: '#333', lineHeight: '1.2' }}
                    >
                        {location}
                    </Typography>
                    <Grid container spacing={4}>
                        {products[location].map((product, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <SpaceCard data={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default CategoryGrid;
