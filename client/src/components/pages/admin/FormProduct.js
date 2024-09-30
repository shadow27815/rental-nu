import React, { useState, useEffect } from "react"; // นำเข้า React และ Hooks สำหรับจัดการ state และ useEffect
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router สำหรับการนำทาง
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material"; // นำเข้า component จาก Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from '@mui/icons-material/Delete'; // นำเข้าไอคอน Delete
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; // นำเข้าไอคอน Edit
import { remove, create, getdata } from "../../../functions/product"; // ฟังก์ชันสำหรับการสร้าง, ลบ, และดึงข้อมูลจาก backend
import { toast } from "react-toastify"; // ใช้ toast สำหรับการแสดงผลข้อความแจ้งเตือน

const FormProduct = () => {
  const [data, setData] = useState([]); // สร้าง state สำหรับเก็บข้อมูลพื้นที่เช่า
  const [form, setForm] = useState({}); // สร้าง state สำหรับเก็บข้อมูลฟอร์ม

  useEffect(() => {
    loadData(); // โหลดข้อมูลเมื่อ component ถูก mount
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูลพื้นที่เช่าจาก backend
  const loadData = async () => {
    getdata()
      .then((res) => setData(res.data)) // เก็บข้อมูลใน state data
      .catch((err) => console.log(err)); // แสดง error หากมีปัญหา
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    if (e.target.name === "file") { // หากเป็นการอัปโหลดไฟล์
      setForm({
        ...form,
        [e.target.name]: e.target.files[0], // เก็บไฟล์ใน state form
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value, // เก็บข้อมูลทั่วไปใน state form
      });
    }
  };

  // ฟังก์ชันสำหรับการส่งข้อมูลฟอร์มเมื่อผู้ใช้กด submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData(); // ใช้ FormData เพื่อรองรับการส่งไฟล์
    for (const key in form) {
      formWithImageData.append(key, form[key]); // เพิ่มข้อมูลแต่ละฟิลด์ใน FormData
    }
    create(formWithImageData) // เรียกฟังก์ชัน create เพื่อเพิ่มข้อมูลใหม่
      .then((res) => {
        console.log(res.data);
        loadData(); // โหลดข้อมูลใหม่หลังจากเพิ่มเสร็จ
      })
      .catch((err) => console.log(err)); // แสดง error หากมีปัญหา
  };

  // ฟังก์ชันสำหรับการลบข้อมูล
  const handleRemove = async (id) => {
    remove(id) // เรียกฟังก์ชัน remove เพื่อทำการลบ
      .then((res) => {
        toast.success('Delete ' + res.data.name + ' Success'); // แสดงข้อความแจ้งเตือน
        loadData(); // โหลดข้อมูลใหม่หลังจากลบเสร็จ
      })
      .catch((err) => console.log(err)); // แสดง error หากมีปัญหา
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        เพิ่มพื้นที่เช่า {/* หัวข้อของฟอร์ม */}
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* ฟอร์มสำหรับกรอกข้อมูล */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Detail"
                name="detail"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="file" // ฟิลด์สำหรับอัปโหลดไฟล์
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
                label="Price"
                name="price"
                onChange={handleChange}
                variant="outlined"
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Submit {/* ปุ่มส่งฟอร์ม */}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* ตารางแสดงข้อมูล */}
      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* หัวตาราง */}
                <TableCell>ลำดับ</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>สถานที่</TableCell>
                <TableCell>ชื่อไฟล์ภาพ</TableCell>
                <TableCell>ราคา</TableCell>
                <TableCell>สถานะ</TableCell> {/* เพิ่มคอลัมน์สถานะ */}
                <TableCell>ลบ</TableCell>
                <TableCell>แก้ไข</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((item, index) => ( // วนลูปแสดงข้อมูลพื้นที่เช่าแต่ละรายการ
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.detail}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.file}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell
                    sx={{
                      color: item.status === 'ว่าง' ? 'green' : item.status === 'มีผู้เช่า' ? 'red' : 'orange', // แสดงสีตามสถานะ
                      fontWeight: 'bold'
                    }}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      color="error"
                      onClick={() => handleRemove(item.id)} // ลบรายการเมื่อคลิกที่ไอคอนลบ
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/edit/${item.id}`}> {/* ลิงก์ไปยังหน้าสำหรับแก้ไข */}
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
