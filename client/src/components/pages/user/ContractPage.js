// ContractPage.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ContractPage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            sx={{ backgroundColor: '#ffffff', padding: 4 }}
        >
            <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 'bold', mb: 4 }}>
                มหาวิทยาลัยนเรศวร
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                maxWidth="600px"
                sx={{
                    mx: 'auto',
                    textAlign: 'left',
                    border: '2px solid #000',
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    เบอร์ติดต่อ: ...
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    Facebook: ...
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    Line: ...
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    สถานที่ติดต่อ: ...
                </Typography>
            </Box>
        </Box>
    );
};

export default ContractPage;
