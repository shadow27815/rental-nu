import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ใช้เพื่อรับค่าพารามิเตอร์จาก URL และนำทาง
import { read, update } from '../../../functions/product'; // นำเข้าฟังก์ชันสำหรับดึงข้อมูลและอัปเดตข้อมูล
import { Box, Button, TextField, Typography, Grid, Paper, Select, MenuItem } from '@mui/material'; // นำเข้า Material UI component
import { toast } from 'react-toastify'; // ใช้สำหรับการแสดงข้อความแจ้งเตือน

const FormEditProduct = () => {
    const params = useParams(); // รับ id จาก URL parameter
    const navigate = useNavigate(); // ฟังก์ชันสำหรับนำทางไปยังหน้าอื่น

    // สร้าง state สำหรับเก็บข้อมูลฟอร์ม
    const [data, setData] = useState({
        name: '',
        detail: '',
        price: 0,
        location: '',
        status: '',  // เพิ่มฟิลด์ status ใน state เพื่อเก็บสถานะ
        tenantId: ''
    });
    const [fileold, setFileOld] = useState(); // เก็บชื่อไฟล์เก่าที่ผู้ใช้เลือก

    useEffect(() => {
        loadData(params.id); // เมื่อ component mount, โหลดข้อมูลตาม id
    }, [params.id]);

    // ฟังก์ชันสำหรับดึงข้อมูลจาก backend โดยใช้ id
    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData({
                    ...res.data,
                    price: parseInt(res.data.price, 10), // แปลงราคาจาก string เป็น integer
                    tenantId: res.data.tenant?.id || '', // กำหนดค่า tenantId ถ้ามี
                    status: res.data.status || ''  // กำหนดค่า status จากข้อมูลที่ดึงมา
                });
                setFileOld(res.data.file); // เก็บชื่อไฟล์เก่า
            })
            .catch((err) => console.log(err));
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e) => {
        if (e.target.name === 'file') { // ถ้าเป็นการอัปโหลดไฟล์
            setData({
                ...data,
                [e.target.name]: e.target.files[0] // เก็บไฟล์ใหม่
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.name === 'price' ? parseInt(e.target.value, 10) : e.target.value // จัดการค่าต่าง ๆ ในฟอร์ม
            });
        }
    };

    // ฟังก์ชันส่งข้อมูลเมื่อผู้ใช้กด submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData(); // ใช้ FormData เพื่อจัดการกับไฟล์และข้อมูล
        for (const key in data) {
            formWithImageData.append(key, data[key]); // เพิ่มข้อมูลแต่ละฟิลด์ใน FormData
        }
        formWithImageData.append('fileold', fileold); // เพิ่มไฟล์เก่าลงไปใน FormData
        update(params.id, formWithImageData) // เรียกฟังก์ชัน update เพื่ออัปเดตข้อมูล
            .then(res => {
                toast.success('Product updated successfully!'); // แสดงข้อความแจ้งเตือนสำเร็จ
                navigate('/admin/viewtable'); // นำทางกลับไปยังหน้า viewtable
            })
            .catch((err) => console.log(err)); // แสดง error หากมีปัญหา
    };

    return (
        <Box p={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    แก้ไขข้อมูลพื้นที่ {/* หัวข้อของฟอร์ม */}
                </Typography>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Grid container spacing={2}>
                        {/* ฟิลด์แก้ไขข้อมูล */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Detail"
                                name="detail"
                                onChange={handleChange}
                                value={data.detail}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                onChange={handleChange}
                                value={data.location}
                                variant="outlined"
                            />
                        </Grid>
                        {/* ฟิลด์สำหรับอัปโหลดไฟล์ */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="file"
                                name="file"
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        {/* ฟิลด์สำหรับแก้ไขราคา */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                onChange={handleChange}
                                value={data.price}
                                variant="outlined"
                            />
                        </Grid>
                        {/* ฟิลด์สำหรับเลือกสถานะ */}
                        <Grid item xs={12} md={6}>
                            <Select
                                fullWidth
                                label="Status"
                                name="status"
                                onChange={handleChange}
                                value={data.status}
                                variant="outlined"
                            >
                                {/* ตัวเลือกสำหรับสถานะ */}
                                <MenuItem value="ว่าง" sx={{ color: 'green', fontWeight: 'bold' }}>ว่าง</MenuItem>
                                <MenuItem value="มีผู้เช่า" sx={{ color: 'red', fontWeight: 'bold' }}>มีผู้เช่า</MenuItem>
                                <MenuItem value="กำลังปรับปรุง" sx={{ color: 'orange', fontWeight: 'bold' }}>กำลังปรับปรุง</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                Submit {/* ปุ่มสำหรับส่งฟอร์ม */}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default FormEditProduct;
