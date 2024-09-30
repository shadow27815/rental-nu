import React, { useEffect, useState } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { fetchTenants, deleteTenant, updateTenant, updateTenantStatus } from "../../../functions/tenant";

const AdminTenantView = () => {
    // State variables
    const [tenants, setTenants] = useState([]); // ข้อมูลผู้เช่าทั้งหมด
    const [editingTenant, setEditingTenant] = useState(null); // ID ของผู้เช่าที่กำลังแก้ไข
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: '',
        startDate: '', endDate: '', products: []
    }); // ข้อมูลฟอร์มสำหรับแก้ไขผู้เช่า
    const [openProductDialog, setOpenProductDialog] = useState(false); // สถานะการเปิด/ปิดหน้าต่างแสดงรายละเอียดพื้นที่
    const [selectedProducts, setSelectedProducts] = useState([]); // พื้นที่ที่เลือกสำหรับแสดงในหน้าต่าง
    const [searchTerm, setSearchTerm] = useState(''); // คำค้นหาสำหรับกรองข้อมูลผู้เช่า

    // โหลดข้อมูลผู้เช่าเมื่อคอมโพเนนต์ถูกโหลดหรือคำค้นหาเปลี่ยน
    useEffect(() => {
        loadTenants();
    }, [searchTerm]);

    // ฟังก์ชันโหลดข้อมูลผู้เช่า
    const loadTenants = async () => {
        try {
            const { data } = await fetchTenants();
            if (data) {
                // กรองข้อมูลตามคำค้นหา
                setTenants(data.filter(tenant =>
                    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
                ));
            } else {
                throw new Error("No data received");
            }
        } catch (error) {
            toast.error("Failed to fetch tenants. " + error.message);
        }
    };

    // ฟังก์ชันลบข้อมูลผู้เช่า
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tenant?")) {
            try {
                await deleteTenant(id);
                toast.success("Tenant deleted successfully");
                loadTenants();
            } catch (error) {
                toast.error("Failed to delete tenant. " + error.message);
            }
        }
    };

    // ฟังก์ชันเริ่มการแก้ไขข้อมูลผู้เช่า
    const handleEdit = (tenant) => {
        setEditingTenant(tenant.id);
        setFormData({
            ...tenant,
            products: tenant.products.map(p => p.id),
            startDate: tenant.startDate ? new Date(tenant.startDate).toISOString().split('T')[0] : '',
            endDate: tenant.endDate ? new Date(tenant.endDate).toISOString().split('T')[0] : ''
        });
    };

    // ฟังก์ชันอัปเดตข้อมูลผู้เช่า
    const handleUpdate = async () => {
        try {
            const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0];
            const formattedEndDate = new Date(formData.endDate).toISOString().split('T')[0];

            const updatedFormData = {
                ...formData,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            };

            await updateTenant(editingTenant, updatedFormData);
            toast.success("Tenant updated successfully");
            setEditingTenant(null);
            resetForm();
            loadTenants();
        } catch (error) {
            toast.error("Failed to update tenant. " + error.message);
        }
    };

    // ฟังก์ชันรีเซ็ตฟอร์ม
    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', message: '', startDate: '', endDate: '', products: [] });
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // ฟังก์ชันแสดงรายละเอียดพื้นที่
    const handleViewProducts = (products) => {
        setSelectedProducts(products);
        setOpenProductDialog(true);
    };

    // ฟังก์ชันค้นหา
    const handleSearch = () => setSearchTerm(searchTerm.trim());

    // ฟังก์ชันอัปเดตสถานะผู้เช่า
    const updateTenantStatusHandler = async (id, status) => {
        try {
            const { data } = await updateTenantStatus(id, status);
            if (data) {
                console.log('Status updated:', data);
                setTenants(prevTenants => prevTenants.map(tenant =>
                    tenant.id === id ? { ...tenant, status: data.status } : tenant
                ));
                toast.success(`Tenant ${status} successfully`);
            } else {
                throw new Error("Failed to update status");
            }
        } catch (error) {
            console.error('Error updating status:', error.response ? error.response.data : error.message);
            toast.error(`Failed to ${status} tenant. ${error.response ? error.response.data : error.message}`);
        }
    };

    // ฟังก์ชันแสดงรายละเอียดพื้นที่
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

    // ส่วนการแสดงผล
    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                ข้อมูลแบบฟอร์ม
            </Typography>
            {/* ส่วนค้นหา */}
            <Box display="flex" justifyContent="center" sx={{ marginBottom: '20px' }}>
                <TextField
                    label="ค้นหา"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    sx={{ width: '300px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{ marginLeft: '10px' }}
                >
                    ค้นหา
                </Button>
            </Box>
            {/* ส่วนแก้ไขข้อมูล */}
            {editingTenant ? (
                <Box component="form" onSubmit={handleUpdate} sx={{ mb: 2 }}>
                    <Typography variant="h6">แก้ไขข้อมูลแบบฟอร์ม</Typography>
                    {["name", "email", "phone", "message"].map((field) => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            fullWidth
                            margin="normal"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    ))}
                    {["startDate", "endDate"].map((field) => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type="date"
                            fullWidth
                            margin="normal"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    ))}
                    <Button type="button" variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            ) : (
                // ส่วนแสดงตารางข้อมูล
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["Name", "Email", "Phone", "Message", "Slip", "Start Date", "End Date", "พื้นที่", "Status", "Approval", "Actions"].map(header => (
                                    <TableCell key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tenants.map(tenant => (
                                <TableRow key={tenant.id}>
                                    <TableCell>{tenant.name}</TableCell>
                                    <TableCell>{tenant.email}</TableCell>
                                    <TableCell>{tenant.phone}</TableCell>
                                    <TableCell>{tenant.message}</TableCell>
                                    <TableCell>
                                        {tenant.slip ? (
                                            <a href={`http://localhost:5000/uploads/${tenant.slip}`} target="_blank" rel="noopener noreferrer">
                                                View Slip
                                            </a>
                                        ) : "No Slip"}
                                    </TableCell>
                                    <TableCell>{new Date(tenant.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(tenant.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleViewProducts(tenant.products)}>
                                            ดูพื้นที่
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: tenant.status === 'APPROVED' ? 'green' : tenant.status === 'REJECTED' ? 'red' : 'orange',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {tenant.status}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => updateTenantStatusHandler(tenant.id, 'APPROVED')}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton onClick={() => updateTenantStatusHandler(tenant.id, 'REJECTED')}>
                                            <CancelIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(tenant)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(tenant.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {/* หน้าต่างแสดงรายละเอียดพื้นที่ */}
            <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>รายละเอียดพื้นที่</DialogTitle>
                <DialogContent>{renderProductDetails(selectedProducts)}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenProductDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminTenantView;