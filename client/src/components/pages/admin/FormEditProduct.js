import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { read, update } from '../../../functions/product';
import { Box, Button, TextField, Typography, Grid, Paper, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

const FormEditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        detail: '',
        price: 0,
        location: '',
        status: '',  // เพิ่มฟิลด์ status ใน state
        tenantId: ''
    });
    const [fileold, setFileOld] = useState();

    useEffect(() => {
        loadData(params.id);
    }, [params.id]);

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData({
                    ...res.data,
                    price: parseInt(res.data.price, 10),
                    tenantId: res.data.tenant?.id || '',
                    status: res.data.status || ''  // กำหนดค่า status
                });
                setFileOld(res.data.file);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.name === 'price' ? parseInt(e.target.value, 10) : e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData();
        for (const key in data) {
            formWithImageData.append(key, data[key]);
        }
        formWithImageData.append('fileold', fileold);
        update(params.id, formWithImageData)
            .then(res => {
                toast.success('Product updated successfully!');
                navigate('/admin/viewtable');
            })
            .catch((err) => console.log(err));
    };

    return (
        <Box p={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    แก้ไขข้อมูลพื้นที่
                </Typography>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Grid container spacing={2}>
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="file"
                                name="file"
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
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
                        <Grid item xs={12} md={6}>
                            <Select
                                fullWidth
                                label="Status"
                                name="status"
                                onChange={handleChange}
                                value={data.status}
                                variant="outlined"
                            >
                                <MenuItem value="ว่าง" sx={{ color: 'green', fontWeight: 'bold' }}>ว่าง</MenuItem>
                                <MenuItem value="มีผู้เช่า" sx={{ color: 'red', fontWeight: 'bold' }}>มีผู้เช่า</MenuItem>
                                <MenuItem value="กำลังปรับปรุง" sx={{ color: 'orange', fontWeight: 'bold' }}>กำลังปรับปรุง</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default FormEditProduct;
