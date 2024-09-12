import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchTenants } from '../../../functions/tenant';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [openProductDialog, setOpenProductDialog] = useState(false);

    useEffect(() => {
        loadTenants();
    }, []);

    const loadTenants = async () => {
        try {
            const { data } = await fetchTenants();
            if (data) {
                const formattedEvents = data.flatMap(tenant => [
                    {
                        title: `${tenant.name} (เริ่มต้น)`,
                        start: tenant.startDate,
                        backgroundColor: 'green',
                        borderColor: 'green',
                        extendedProps: { products: tenant.products }
                    },
                    {
                        title: `${tenant.name} (สิ้นสุด)`,
                        start: tenant.endDate,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        extendedProps: { products: tenant.products }
                    }
                ]);
                setEvents(formattedEvents);
            } else {
                throw new Error('ไม่พบข้อมูล');
            }
        } catch (error) {
            console.error('ไม่สามารถโหลดข้อมูลการเช่า:', error.message);
        }
    };

    const handleEventClick = (info) => {
        setSelectedProducts(info.event.extendedProps.products); // ดึงข้อมูลพื้นที่จาก extendedProps
        setOpenProductDialog(true); // เปิดโมดัล
    };

    const renderProductDetails = (products) => (
        <Box display="flex" justifyContent="center">
            <Grid container spacing={2} justifyContent="center">
                {products.length > 0 ? products.map((product, index) => (
                    <Grid item container spacing={2} key={index} alignItems="center">
                        <Grid item>
                            {product.file && (
                                <img src={`http://localhost:5000/uploads/${product.file}`} alt={product.name} style={{ width: '300px', height: '300px' }} />
                            )}
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5"><strong>ชื่อ:</strong> {product.name}</Typography>
                            <Typography variant="h6"><strong>รายละเอียด:</strong> {product.detail}</Typography>
                            <Typography variant="h6"><strong>ราคา:</strong> {product.price}</Typography>
                            <Typography variant="h6"><strong>สถานที่:</strong> {product.location}</Typography>
                            <Typography variant="h6" style={{
                                color: product.status === 'ว่าง' ? 'green' : product.status === 'มีผู้เช่า' ? 'red' : 'orange',
                                fontWeight: 'bold'
                            }}>
                                สถานะ: {product.status}
                            </Typography>
                        </Grid>
                    </Grid>
                )) : (
                    <Typography variant="h6" align="center">ไม่พบข้อมูลพื้นที่</Typography>
                )}
            </Grid>
        </Box>
    );

    return (
        <Box sx={{ padding: '30px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom>
                ปฏิทินการเช่าพื้นที่
            </Typography>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                eventColor="#378006"
                selectable={true}
                editable={true}
                locale='th'
                buttonText={{
                    today: 'วันนี้',
                    month: 'เดือน',
                    week: 'สัปดาห์',
                    day: 'วัน',
                    list: 'รายการ'
                }}
                firstDay={1}
                eventClick={handleEventClick} // เรียกใช้เมื่อคลิกที่อีเวนต์
            />

            <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>รายละเอียดพื้นที่</DialogTitle>
                <DialogContent>{renderProductDetails(selectedProducts)}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenProductDialog(false)} color="primary">
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CalendarView;
