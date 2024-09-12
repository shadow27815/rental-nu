import React, { useState } from 'react';
import SpaceNew from '../../home/SpaceNew';
import { Box, Typography, Container, TextField, Button, Menu, MenuItem, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HomepageUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({ price: null, location: null, status: null });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleKeyPress = (e) => { if (e.key === 'Enter') setSubmittedTerm(searchTerm.trim()); };
  const handleSearchClick = () => setSubmittedTerm(searchTerm.trim());

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const handleFilterSelect = (filterType, value) => setFilter((prevFilter) => ({ ...prevFilter, [filterType]: value }));
  const handleResetFilters = () => setFilter({ price: null, location: null, status: null });

  const carouselItems = [
    { image: '/assets/ocen1.jpg', title: 'พื้นที่ยอดนิยม 1' },
    { image: '/assets/ocen2.jpg', title: 'พื้นที่ยอดนิยม 2' },
    { image: '/assets/ocen3.jpg', title: 'พื้นที่ยอดนิยม 3' },
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/assets/hotel2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
            จองพื้นที่เช่ามหาลัยนเรศวร
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: '#fff', marginTop: '20px' }}>
            พบกับพื้นที่เช่าหลากหลายประเภท พร้อมบริการที่ครบครัน
          </Typography>
        </Container>
      </Box>

      {/* Carousel */}
      <Container maxWidth="lg" sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Typography variant="h4" align="center" sx={{ color: '#333' }}>พื้นที่ยอดนิยม</Typography>
        <Carousel NextIcon={<ArrowForwardIosIcon />} PrevIcon={<ArrowBackIosIcon />}>
          {carouselItems.map((item, i) => (
            <Box key={i} sx={{ textAlign: 'center' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              <Typography variant="h6" sx={{ marginTop: '10px', color: '#333' }}>{item.title}</Typography>
            </Box>
          ))}
        </Carousel>
      </Container>

      {/* Search & Filters */}
      <Container maxWidth="lg" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', maxWidth: '800px', margin: '0 auto' }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ gap: '10px' }}>
            <TextField
              label="ค้นหาพื้นที่"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearchClick}>ค้นหา</Button>
            <Button variant="outlined" color="secondary" onClick={handleFilterClick}>ตัวกรอง</Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
              <MenuItem onClick={() => handleFilterSelect('price', 'low-to-high')}>กรองตามราคาต่ำไปสูง</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('price', 'high-to-low')}>กรองตามราคาสูงไปต่ำ</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('status', 'ว่าง')}><Typography sx={{ color: 'green' }}>ว่าง</Typography></MenuItem>
              <MenuItem onClick={() => handleFilterSelect('status', 'มีผู้เช่า')}><Typography sx={{ color: 'red' }}>มีผู้เช่า</Typography></MenuItem>
            </Menu>

            <Button variant="outlined" color="warning" onClick={handleResetFilters}>รีเซ็ตการกรอง</Button>
          </Box>
        </Paper>
      </Container>

      {/* Display Spaces */}
      <Container maxWidth="lg" sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <SpaceNew searchTerm={submittedTerm} filter={filter} />
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#2E2E2E', padding: '20px', color: 'white', marginTop: 'auto' }}>
        <Typography variant="h4" align="center">NU Website</Typography>
        <Typography variant="body1" align="center">หากมีข้อผิดพลาดกรุณาติดต่อ เบอร์โทร...</Typography>
        <Typography variant="body1" align="center">อาจารย์แดงกีต้า</Typography>
      </Box>
    </div>
  );
};

export default HomepageUser;
