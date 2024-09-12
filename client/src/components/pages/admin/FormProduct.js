import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { remove, create, getdata } from "../../../functions/product";
import { toast } from "react-toastify";

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();
    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }
    create(formWithImageData)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        toast.success('Delete  ' + res.data.name + ' Success');
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        เพิ่มพื้นที่เช่า
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                name="name"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Detail"
                name="detail"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Location"
                name="location"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="file"
                id="outlined-basic"
                label="File"
                name="file"
                onChange={handleChange}
                variant="outlined"
                focused
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                id="outlined-basic"
                label="Price"
                name="price"
                onChange={handleChange}
                variant="outlined"
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ลำดับ</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>สถานที่</TableCell>
                <TableCell>ชื่อไฟล์ภาพ</TableCell>
                <TableCell>ราคา</TableCell>
                <TableCell>สถานะ</TableCell> {/* เพิ่มคอลัมน์แสดงสถานะ */}
                <TableCell>ลบ</TableCell>
                <TableCell>แก้ไข</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((item, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.detail}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.file}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell
                    sx={{
                      color: item.status === 'ว่าง' ? 'green' : item.status === 'มีผู้เช่า' ? 'red' : 'orange',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleRemove(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/edit/${item.id}`}>
                      <EditOutlinedIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default FormProduct;
