import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/th';

moment.locale('th'); // กำหนดการใช้ภาษาไทยสำหรับ moment.js

// สร้างคอมโพเนนต์ PageContainer สำหรับจัดการเลย์เอาต์ของหน้า
const PageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
`;

// คอมโพเนนต์สำหรับจัดการฟอร์ม
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
`;

// สร้างคอมโพเนนต์สำหรับแสดงรูป QR Code
const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

// สไตล์สำหรับปุ่มอัพโหลดสลิป
const UploadButton = styled(Button)`
  margin-top: 20px;
  background-color: #175bdb; /* เปลี่ยนสีให้เหมือนกับปุ่มส่ง */
  &:hover {
    background-color: #0741ae;
  }
`;

// คอมโพเนนต์สำหรับแสดงข้อความยืนยันความสำเร็จ
const SuccessMessageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 20px;
`;

// กล่องข้อความยืนยันความสำเร็จ
const SuccessMessageBox = styled(Box)`
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  text-align: center;
`;

const TenantForm = () => {
    // สร้าง state สำหรับเก็บข้อมูลจากฟอร์ม
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        slip: null,  // เก็บไฟล์สลิปการโอนเงิน
        startDate: '',
        endDate: '',
        products: [] // รายการพื้นที่ที่ผู้ใช้เลือก
    });

    const [formSubmitted, setFormSubmitted] = useState(false); // เช็คว่าส่งฟอร์มหรือยัง
    const navigate = useNavigate(); // ใช้สำหรับการนำทางระหว่างหน้า
    const location = useLocation(); // ใช้เพื่อดึงข้อมูล URL

    // ดึง product ID จาก query string ของ URL และใส่ใน state
    useEffect(() => {
        const productId = new URLSearchParams(location.search).get('product');
        if (productId) {
            setFormData(prevFormData => ({ ...prevFormData, products: [productId] }));
        }
    }, [location.search]);

    // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าของ input ต่างๆ
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงไฟล์สลิป
    const handleFileChange = (e) => {
        setFormData({ ...formData, slip: e.target.files[0] });
    };

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันการ reload หน้าเมื่อกดส่ง

        // ฟอร์แมตวันที่ให้อยู่ในรูปแบบ ปี-เดือน-วัน (YYYY-MM-DD)
        const formattedStartDate = moment(formData.startDate).isValid() ? moment(formData.startDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = moment(formData.endDate).isValid() ? moment(formData.endDate).format('YYYY-MM-DD') : null;

        // ตรวจสอบรูปแบบวันที่ว่าถูกต้องหรือไม่
        if (!formattedStartDate || !formattedEndDate) {
            console.error('Invalid date format');
            return;
        }

        // เตรียมข้อมูลในรูปแบบ FormData สำหรับส่งข้อมูลที่มีไฟล์
        const formWithImageData = new FormData();
        for (const key in formData) {
            if (key === 'startDate') {
                formWithImageData.append(key, formattedStartDate);
            } else if (key === 'endDate') {
                formWithImageData.append(key, formattedEndDate);
            } else {
                formWithImageData.append(key, formData[key]);
            }
        }

        try {
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์
            const response = await fetch('http://localhost:5000/api/tenant', {
                method: 'POST',
                body: formWithImageData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setFormSubmitted(true); // เมื่อส่งฟอร์มสำเร็จ
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // ฟังก์ชันที่ทำงานเมื่อกดปุ่ม "กลับไปยังหน้า HomepageUser"
    const handleGoHome = () => {
        navigate('/user/index'); // นำทางกลับไปยังหน้า HomepageUser
    };

    return (
        <PageContainer>
            {formSubmitted ? (
                // ถ้าฟอร์มถูกส่งแล้ว แสดงข้อความยืนยันความสำเร็จ
                <SuccessMessageContainer>
                    <SuccessMessageBox>
                        <Typography variant="h4" gutterBottom>
                            แบบฟอร์มของคุณถูกบันทึกแล้ว
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            กรุณารอเจ้าหน้าที่ติดต่อกลับ
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#175bdb',
                                '&:hover': {
                                    backgroundColor: '#0741ae',
                                }
                            }}
                            onClick={handleGoHome}
                        >
                            กลับไปยังหน้า HomepageUser
                        </Button>
                    </SuccessMessageBox>
                </SuccessMessageContainer>
            ) : (
                // แสดงฟอร์มสำหรับกรอกข้อมูล
                <FormContainer>
                    <Typography variant="h4" gutterBottom align="center">
                        แบบฟอร์มผู้เช่า
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="ชื่อ"
                                    fullWidth
                                    margin="normal"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="อีเมล"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="phone"
                                    label="เบอร์โทรศัพท์"
                                    type="tel"
                                    fullWidth
                                    margin="normal"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    label="ข้อความ"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="startDate"
                                    label="วันที่เริ่มเช่า"
                                    type="date"  // ใช้ input type เป็นวันที่
                                    fullWidth
                                    margin="normal"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="endDate"
                                    label="วันที่สิ้นสุดเช่า"
                                    type="date"  // ใช้ input type เป็นวันที่
                                    fullWidth
                                    margin="normal"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <input
                                type="hidden"
                                name="products"
                                value={formData.products}
                            />
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <QRCodeImage src="/assets/QRcode11.jpg" alt="QR Code" />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="upload-slip"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="upload-slip">
                                    <UploadButton variant="contained" component="span">
                                        อัพโหลดสลิปการโอนจ่าย
                                    </UploadButton>
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#175bdb',
                                        '&:hover': {
                                            backgroundColor: '#0741ae',
                                        },
                                        marginTop: '20px'
                                    }}
                                    fullWidth
                                >
                                    ส่ง
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography variant="body1" style={{ marginTop: '40px' }}>
                        โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดส่ง
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: '40px' }}>
                        Nu Website
                    </Typography>
                </FormContainer>
            )}
        </PageContainer>
    );
};

export default TenantForm;
