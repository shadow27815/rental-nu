import React, { useState, useEffect } from 'react'; // นำเข้า React และ Hooks สำหรับการจัดการ state และ effect
import FullCalendar from '@fullcalendar/react'; // นำเข้า FullCalendar สำหรับการแสดงปฏิทิน
import dayGridPlugin from '@fullcalendar/daygrid'; // นำเข้า plugin สำหรับมุมมอง day grid
import timeGridPlugin from '@fullcalendar/timegrid'; // นำเข้า plugin สำหรับมุมมอง time grid
import interactionPlugin from '@fullcalendar/interaction'; // นำเข้า plugin สำหรับการโต้ตอบ เช่น การคลิก
import { fetchTenants } from '../../../functions/tenant'; // ฟังก์ชันดึงข้อมูล tenants จาก backend
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material'; // นำเข้าจาก Material UI

// คอมโพเนนต์หลักที่แสดงปฏิทิน
const CalendarView = () => {
    const [events, setEvents] = useState([]); // state สำหรับเก็บข้อมูลอีเวนต์
    const [selectedProducts, setSelectedProducts] = useState([]); // state สำหรับเก็บข้อมูลพื้นที่ที่ถูกเลือก
    const [openProductDialog, setOpenProductDialog] = useState(false); // state สำหรับควบคุมการเปิด-ปิด Dialog

    // useEffect เรียกฟังก์ชัน loadTenants เมื่อ component mount
    useEffect(() => {
        loadTenants();
    }, []);

    // ฟังก์ชันสำหรับดึงข้อมูล tenants จาก API และแปลงเป็นข้อมูลอีเวนต์สำหรับ FullCalendar
    const loadTenants = async () => {
        try {
            const { data } = await fetchTenants(); // ดึงข้อมูล tenants
            if (data) {
                // แปลงข้อมูล tenants เป็นอีเวนต์ในปฏิทิน โดยมีเริ่มต้นและสิ้นสุด
                const formattedEvents = data.flatMap(tenant => [
                    {
                        title: `${tenant.name} (เริ่มต้น)`, // ชื่ออีเวนต์เมื่อเช่าเริ่มต้น
                        start: tenant.startDate, // วันที่เริ่มต้น
                        backgroundColor: 'green', // สีเขียวสำหรับเริ่มต้น
                        borderColor: 'green',
                        extendedProps: { products: tenant.products } // เก็บข้อมูลพื้นที่เพิ่มเติมใน extendedProps
                    },
                    {
                        title: `${tenant.name} (สิ้นสุด)`, // ชื่ออีเวนต์เมื่อเช่าสิ้นสุด
                        start: tenant.endDate, // วันที่สิ้นสุด
                        backgroundColor: 'red', // สีแดงสำหรับสิ้นสุด
                        borderColor: 'red',
                        extendedProps: { products: tenant.products } // เก็บข้อมูลพื้นที่เพิ่มเติมใน extendedProps
                    }
                ]);
                setEvents(formattedEvents); // เก็บอีเวนต์ใน state
            } else {
                throw new Error('ไม่พบข้อมูล');
            }
        } catch (error) {
            console.error('ไม่สามารถโหลดข้อมูลการเช่า:', error.message); // แสดง error หากมีปัญหาในการโหลดข้อมูล
        }
    };

    // ฟังก์ชันเรียกใช้เมื่อคลิกที่อีเวนต์ในปฏิทิน
    const handleEventClick = (info) => {
        setSelectedProducts(info.event.extendedProps.products); // ดึงข้อมูลพื้นที่จาก extendedProps ของอีเวนต์
        setOpenProductDialog(true); // เปิด Dialog เพื่อแสดงรายละเอียดพื้นที่
    };

    // ฟังก์ชันแสดงรายละเอียดของพื้นที่ใน Dialog
    const renderProductDetails = (products) => (
        <Box display="flex" justifyContent="center"> {/* จัด layout ของรายละเอียดพื้นที่ */}
            <Grid container spacing={2} justifyContent="center"> {/* ใช้ Grid เพื่อจัด layout */}
                {products.length > 0 ? products.map((product, index) => (
                    <Grid item container spacing={2} key={index} alignItems="center"> {/* วนลูปแสดงแต่ละพื้นที่ */}
                        <Grid item>
                            {product.file && ( // ถ้ามีไฟล์รูปภาพ จะแสดงรูป
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
        <Box sx={{ padding: '30px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}> {/* การตั้งค่า layout และพื้นหลังของหน้า */}
            <Typography variant="h4" align="center" gutterBottom>
                ปฏิทินการเช่าพื้นที่ {/* หัวข้อของหน้า */}
            </Typography>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // กำหนด plugins ที่จะใช้ในปฏิทิน
                initialView="dayGridMonth" // มุมมองเริ่มต้นเป็นเดือน
                headerToolbar={{
                    left: 'prev,next today', // ปุ่มทางซ้าย
                    center: 'title', // หัวข้อกลาง
                    right: 'dayGridMonth,timeGridWeek,timeGridDay' // ปุ่มเปลี่ยนมุมมองทางขวา
                }}
                events={events} // ข้อมูลอีเวนต์ที่จะแสดงในปฏิทิน
                eventColor="#378006" // สีของอีเวนต์
                selectable={true} // อนุญาตให้คลิกเลือกอีเวนต์ได้
                editable={true} // อนุญาตให้แก้ไขอีเวนต์ได้ (ลากหรือย้าย)
                locale='th' // ตั้งค่าภาษาไทย
                buttonText={{
                    today: 'วันนี้', // ปุ่ม "วันนี้"
                    month: 'เดือน', // ปุ่มมุมมอง "เดือน"
                    week: 'สัปดาห์', // ปุ่มมุมมอง "สัปดาห์"
                    day: 'วัน', // ปุ่มมุมมอง "วัน"
                    list: 'รายการ' // ปุ่มมุมมอง "รายการ"
                }}
                firstDay={1} // กำหนดวันเริ่มต้นของสัปดาห์เป็นวันจันทร์
                eventClick={handleEventClick} // ฟังก์ชันที่เรียกเมื่อคลิกที่อีเวนต์
            />

            {/* Dialog สำหรับแสดงรายละเอียดพื้นที่ */}
            <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>รายละเอียดพื้นที่</DialogTitle>
                <DialogContent>{renderProductDetails(selectedProducts)}</DialogContent> {/* แสดงรายละเอียดพื้นที่ */}
                <DialogActions>
                    <Button onClick={() => setOpenProductDialog(false)} color="primary">
                        ปิด {/* ปุ่มปิด Dialog */}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CalendarView;
