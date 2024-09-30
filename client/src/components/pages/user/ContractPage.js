import React from 'react';
import { Box, Typography } from '@mui/material'; // นำเข้า components จาก Material UI

const ContractPage = () => {
    return (
        <Box
            display="flex" // จัด layout แบบ flexbox
            flexDirection="column" // จัดให้ลูกของ Box เรียงในแนวตั้ง
            alignItems="center" // จัดลูกให้จัดกึ่งกลางในแนวแกนนอน
            justifyContent="center" // จัดลูกให้อยู่กลางในแนวแกนตั้ง
            minHeight="100vh" // ให้ Box มีความสูงเท่ากับความสูงของ viewport ทั้งหมด
            textAlign="center" // จัดข้อความให้อยู่ตรงกลาง
            sx={{ backgroundColor: '#ffffff', padding: 4 }} // ใช้ sx ในการกำหนด style เพิ่มเติม (background สีขาวและ padding รอบ)
        >
            {/* หัวข้อของหน้า */}
            <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 'bold', mb: 4 }}>
                มหาวิทยาลัยนเรศวร
            </Typography>

            {/* กล่องที่แสดงรายละเอียดการติดต่อ */}
            <Box
                display="flex"
                flexDirection="column" // จัดเรียงข้อมูลในแนวตั้ง
                alignItems="flex-start" // จัดให้อยู่เริ่มต้นทางซ้ายมือ
                maxWidth="600px" // จำกัดความกว้างของกล่องไม่ให้เกิน 600px
                sx={{
                    mx: 'auto', // จัดให้อยู่ตรงกลางโดยใช้ margin ซ้าย-ขวา auto
                    textAlign: 'left', // จัดข้อความให้อยู่ชิดซ้าย
                    border: '2px solid #000', // เส้นขอบสีดำหนา 2px
                    padding: 4, // padding รอบๆ กล่อง
                    borderRadius: 2, // ทำให้มุมกล่องโค้งเล็กน้อย
                    backgroundColor: '#ffffff', // สีพื้นหลังสีขาว
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // เงาด้านล่างเล็กน้อยเพื่อให้ดูมีมิติ
                }}
            >
                {/* รายละเอียดการติดต่อ */}
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    เบอร์ติดต่อ: ... {/* ที่ใส่ข้อมูลการติดต่อ */}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    Facebook: ... {/* ที่ใส่ข้อมูล Facebook */}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    Line: ... {/* ที่ใส่ข้อมูล Line */}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2.5rem', my: 2 }}>
                    สถานที่ติดต่อ: ... {/* ที่ใส่ข้อมูลสถานที่ */}
                </Typography>
            </Box>
        </Box>
    );
};

export default ContractPage;
