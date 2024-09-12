import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from '@mui/material';
import { toast } from 'react-toastify';
import { fetchTenants } from '../../../functions/tenant';

const UserFormsView = () => {
    const [tenants, setTenants] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [openProductDialog, setOpenProductDialog] = useState(false);

    useEffect(() => {
        loadTenants();
    }, []);

    const loadTenants = async () => {
        try {
            const { data } = await fetchTenants();
            if (data) {
                setTenants(data);
            } else {
                throw new Error('No data received');
            }
        } catch (error) {
            toast.error('Failed to fetch tenants. ' + error.message);
        }
    };

    const handleViewProducts = (products) => {
        setSelectedProducts(products);
        setOpenProductDialog(true);
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
        <Box
            sx={{
                backgroundColor: '#F5F5F5', // สีพื้นหลังของหน้าดูแบบฟอร์ม
                minHeight: '100vh', // ทำให้หน้ามีความสูงเต็มหน้าจอ
                paddingTop: '30px',
                paddingBottom: '30px',
            }}
        >
            <Typography variant="h4" gutterBottom align="center">
                ข้อมูลแบบฟอร์ม
            </Typography>
            <Container maxWidth="lg">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["Name", "Email", "Phone", "Message", "Slip", "Start Date", "End Date", "พื้นที่", "Status"].map(header => (
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
                                    <TableCell>{new Date(tenant.startDate).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(tenant.endDate).toLocaleString()}</TableCell>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
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

export default UserFormsView;
