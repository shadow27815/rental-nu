import React, { useState } from 'react';
import SpaceNew from '../../home/SpaceNew';
import { Box, Typography, Container, TextField, Button, Menu, MenuItem, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HomepageUser = () => {
  // ตั้งค่าตัวแปรสำหรับเก็บข้อมูลที่ผู้ใช้พิมพ์ลงไปในการค้นหา
  const [searchTerm, setSearchTerm] = useState('');

  // ตั้งค่าตัวแปรสำหรับเก็บข้อมูลการค้นหาที่ถูกส่ง (เมื่อกดปุ่มค้นหา)
  const [submittedTerm, setSubmittedTerm] = useState('');

  // ตั้งค่าตัวแปรสำหรับเก็บสถานะของตัวกรอง (เมนูฟิลเตอร์)
  const [anchorEl, setAnchorEl] = useState(null);

  // เก็บค่าตัวกรองที่เลือก (ราคา, สถานที่, สถานะ)
  const [filter, setFilter] = useState({ price: null, location: null, status: null });

  // ฟังก์ชันเมื่อผู้ใช้พิมพ์ในช่องค้นหา
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // ฟังก์ชันเมื่อผู้ใช้กดปุ่ม Enter หลังจากพิมพ์เสร็จ
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') setSubmittedTerm(searchTerm.trim()); // trim() เพื่อตัดช่องว่างก่อนและหลัง
  };

  // ฟังก์ชันเมื่อผู้ใช้คลิกปุ่มค้นหา
  const handleSearchClick = () => setSubmittedTerm(searchTerm.trim());

  // เปิดเมนูตัวกรอง
  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);

  // ปิดเมนูตัวกรอง
  const handleFilterClose = () => setAnchorEl(null);

  // เลือกตัวกรอง (เช่น กรองตามราคา หรือสถานะ)
  const handleFilterSelect = (filterType, value) => setFilter((prevFilter) => ({ ...prevFilter, [filterType]: value }));

  // รีเซ็ตตัวกรองทั้งหมด
  const handleResetFilters = () => setFilter({ price: null, location: null, status: null });

  // รายการภาพที่ใช้ใน Carousel (สไลด์รูปภาพ)
  const carouselItems = [
    { image: '/assets/nu14.png', title: 'ข่าวประชาสัมพันธ์ 1' },
    { image: '/assets/nu15.png', title: 'ข่าวประชาสัมพันธ์ 2' },
    { image: '/assets/nu16.png', title: 'ข่าวประชาสัมพันธ์ 3' },
    { image: '/assets/nu16.jpg', title: 'ข่าวประชาสัมพันธ์ 4' },
    { image: '/assets/nu17.png', title: 'ข่าวประชาสัมพันธ์ 5' },
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>

      {/* Hero Section - แสดงภาพพื้นหลังและข้อความหัวข้อใหญ่ */}
      <Box
        sx={{
          backgroundImage: 'url(/assets/nu13.jpg)', // รูปพื้นหลัง
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0', // เว้นระยะขอบบน-ล่าง
        }}
      >
        <Container maxWidth="lg">
          {/* ข้อความหัวเรื่อง */}
          <Typography variant="h2" align="center" sx={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
            จองพื้นที่เช่ามหาลัยนเรศวร
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: '#fff', marginTop: '20px' }}>
            พบกับพื้นที่เช่าหลากหลายประเภท พร้อมบริการที่ครบครัน
          </Typography>
        </Container>
      </Box>

      {/* Carousel - แสดงข่าวประชาสัมพันธ์ */}
      <Container maxWidth="lg" sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Typography variant="h4" align="center" sx={{ color: '#333' }}>ข่าวประชาสัมพันธ์</Typography>
        <Carousel NextIcon={<ArrowForwardIosIcon />} PrevIcon={<ArrowBackIosIcon />}>
          {carouselItems.map((item, i) => (
            <Box key={i} sx={{ textAlign: 'center' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              <Typography variant="h6" sx={{ marginTop: '10px', color: '#333' }}>{item.title}</Typography>
            </Box>
          ))}
        </Carousel>
      </Container>

      {/* Search & Filters - ช่องค้นหาและเมนูตัวกรอง */}
      <Container maxWidth="lg" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', maxWidth: '800px', margin: '0 auto' }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ gap: '10px' }}>
            <TextField
              label="ค้นหาพื้นที่"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange} // เมื่อพิมพ์ในช่องค้นหา
              onKeyPress={handleKeyPress}   // เมื่อกดปุ่ม Enter
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearchClick}>ค้นหา</Button>
            <Button variant="outlined" color="secondary" onClick={handleFilterClick}>ตัวกรอง</Button>

            {/* เมนูตัวกรอง */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
              <MenuItem onClick={() => handleFilterSelect('price', 'low-to-high')}>กรองตามราคาต่ำไปสูง</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('price', 'high-to-low')}>กรองตามราคาสูงไปต่ำ</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('status', 'ว่าง')}><Typography sx={{ color: 'green' }}>ว่าง</Typography></MenuItem>
              <MenuItem onClick={() => handleFilterSelect('status', 'มีผู้เช่า')}><Typography sx={{ color: 'red' }}>มีผู้เช่า</Typography></MenuItem>
            </Menu>

            {/* ปุ่มรีเซ็ตตัวกรอง */}
            <Button variant="outlined" color="warning" onClick={handleResetFilters}>รีเซ็ตการกรอง</Button>
          </Box>
        </Paper>
      </Container>

      {/* Display Spaces - แสดงพื้นที่เช่าที่ค้นหาหรือกรองแล้ว */}
      <Container maxWidth="lg" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <SpaceNew searchTerm={submittedTerm} filter={filter} />
      </Container>

      {/* Footer - แสดงข้อมูลที่ติดต่อ */}
      <Box sx={{ backgroundColor: '#2E2E2E', padding: '20px', color: 'white', marginTop: 'auto' }}>
        <Typography variant="h4" align="center">NU Website</Typography>
        <Typography variant="body1" align="center">หากมีข้อผิดพลาดกรุณาติดต่อ เบอร์โทร...</Typography>
        <Typography variant="body1" align="center">อาจารย์แดงกีต้า</Typography>
      </Box>
    </div>
  );
};

export default HomepageUser;
