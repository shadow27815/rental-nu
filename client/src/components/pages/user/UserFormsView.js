import React, { useState, useEffect } from 'react'; // นำเข้า React และ Hooks ที่จำเป็น
import {
    Box, Typography, Container, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, Grid
} from '@mui/material'; // นำเข้า components จาก Material UI
import { toast } from 'react-toastify'; // ใช้ toast เพื่อแสดงข้อความแจ้งเตือน
import { fetchTenants } from '../../../functions/tenant'; // นำเข้าฟังก์ชัน fetchTenants เพื่อดึงข้อมูล tenant

// คอมโพเนนต์หลักที่แสดงรายการ tenant
const UserFormsView = () => {
    const [tenants, setTenants] = useState([]); // สร้าง state เพื่อเก็บข้อมูล tenant
    const [selectedProducts, setSelectedProducts] = useState([]); // สร้าง state เพื่อเก็บพื้นที่ที่ถูกเลือก
    const [openProductDialog, setOpenProductDialog] = useState(false); // สร้าง state เพื่อควบคุมการเปิด-ปิด Dialog

    // เรียกฟังก์ชัน loadTenants เมื่อตัวคอมโพเนนต์ mount
    useEffect(() => {
        loadTenants();
    }, []);

    // ฟังก์ชันสำหรับดึงข้อมูล tenants จาก API
    const loadTenants = async () => {
        try {
            const { data } = await fetchTenants(); // ดึงข้อมูล tenants
            if (data) {
                setTenants(data); // เก็บข้อมูล tenants ใน state
            } else {
                throw new Error('No data received'); // หากไม่ได้รับข้อมูล ให้แจ้ง error
            }
        } catch (error) {
            toast.error('Failed to fetch tenants. ' + error.message); // แสดง error หากเกิดปัญหาในการดึงข้อมูล
        }
    };

    // ฟังก์ชันสำหรับเปิด Dialog แสดงพื้นที่ของ tenant
    const handleViewProducts = (products) => {
        setSelectedProducts(products); // เก็บข้อมูลพื้นที่ที่ถูกเลือก
        setOpenProductDialog(true); // เปิด Dialog
    };

    // ฟังก์ชันสำหรับการแสดงรายละเอียดของพื้นที่ใน Dialog
    const renderProductDetails = (products) => (
        <Box display="flex" justifyContent="center"> {/* จัดการ layout ของ Box ให้ตรงกลาง */}
            <Grid container spacing={2} justifyContent="center"> {/* ใช้ Grid เพื่อจัด layout ของรายละเอียดพื้นที่ */}
                {products.length > 0 ? products.map((product, index) => ( // ตรวจสอบว่ามีพื้นที่หรือไม่
                    <Grid item container spacing={2} key={index} alignItems="center"> {/* วนลูปแสดงแต่ละพื้นที่ */}
                        <Grid item>
                            {product.file && ( // แสดงรูปภาพถ้ามีไฟล์รูป
                                <img src={`http://localhost:5000/uploads/${product.file}`} alt={product.name} style={{ width: '300px', height: '300px' }} />
                            )}
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5"><strong>ชื่อ:</strong> {product.name}</Typography> {/* แสดงชื่อพื้นที่ */}
                            <Typography variant="h6"><strong>รายละเอียด:</strong> {product.detail}</Typography> {/* แสดงรายละเอียดพื้นที่ */}
                            <Typography variant="h6"><strong>ราคา:</strong> {product.price}</Typography> {/* แสดงราคา */}
                            <Typography variant="h6"><strong>สถานที่:</strong> {product.location}</Typography> {/* แสดงสถานที่ */}
                            <Typography variant="h6" style={{
                                color: product.status === 'ว่าง' ? 'green' : product.status === 'มีผู้เช่า' ? 'red' : 'orange',
                                fontWeight: 'bold'
                            }}>
                                สถานะ: {product.status} {/* แสดงสถานะของพื้นที่ */}
                            </Typography>
                        </Grid>
                    </Grid>
                )) : (
                    <Typography variant="h6" align="center">ไม่พบข้อมูลพื้นที่</Typography> // กรณีไม่มีข้อมูลพื้นที่
                )}
            </Grid>
        </Box>
    );

    return (
        <Box
            sx={{
                backgroundColor: '#F5F5F5', // สีพื้นหลังของหน้าดูแบบฟอร์ม
                minHeight: '100vh', // ทำให้หน้ามีความสูงเต็มหน้าจอ
                paddingTop: '30px',
                paddingBottom: '30px',
            }}
        >
            <Typography variant="h4" gutterBottom align="center">
                ข้อมูลแบบฟอร์ม {/* หัวข้อหลักของหน้า */}
            </Typography>
            <Container maxWidth="lg"> {/* กำหนดความกว้างของ Container */}
                <TableContainer component={Paper}> {/* สร้าง TableContainer */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* กำหนดหัวตาราง */}
                                {["Name", "Email", "Phone", "Message", "Slip", "Start Date", "End Date", "พื้นที่", "Status"].map(header => (
                                    <TableCell key={header}>{header}</TableCell> // วนลูปแสดงหัวตาราง
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tenants.map(tenant => ( // วนลูปแสดงข้อมูล tenants ในแต่ละแถวของตาราง
                                <TableRow key={tenant.id}>
                                    <TableCell>{tenant.name}</TableCell> {/* ชื่อผู้เช่า */}
                                    <TableCell>{tenant.email}</TableCell> {/* อีเมล */}
                                    <TableCell>{tenant.phone}</TableCell> {/* เบอร์โทรศัพท์ */}
                                    <TableCell>{tenant.message}</TableCell> {/* ข้อความ */}
                                    <TableCell>
                                        {tenant.slip ? ( // ตรวจสอบว่ามีสลิปหรือไม่
                                            <a href={`http://localhost:5000/uploads/${tenant.slip}`} target="_blank" rel="noopener noreferrer">
                                                View Slip {/* ลิงก์ไปยังสลิป */}
                                            </a>
                                        ) : "No Slip"} {/* แสดงข้อความถ้าไม่มีสลิป */}
                                    </TableCell>
                                    <TableCell>{new Date(tenant.startDate).toLocaleString()}</TableCell> {/* วันที่เริ่ม */}
                                    <TableCell>{new Date(tenant.endDate).toLocaleString()}</TableCell> {/* วันที่สิ้นสุด */}
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleViewProducts(tenant.products)}>
                                            ดูพื้นที่ {/* ปุ่มแสดงพื้นที่ */}
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: tenant.status === 'APPROVED' ? 'green' : tenant.status === 'REJECTED' ? 'red' : 'orange',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {tenant.status} {/* แสดงสถานะการอนุมัติ */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            {/* Dialog สำหรับแสดงรายละเอียดพื้นที่ */}
            <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>รายละเอียดพื้นที่</DialogTitle>
                <DialogContent>{renderProductDetails(selectedProducts)}</DialogContent> {/* แสดงรายละเอียดพื้นที่ */}
                <DialogActions>
                    <Button onClick={() => setOpenProductDialog(false)} color="primary">Close</Button> {/* ปุ่มปิด Dialog */}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserFormsView;
