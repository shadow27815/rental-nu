import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { register } from "../../../functions/auth";
import { toast } from "react-toastify";

// ฟังก์ชันแสดงข้อความลิขสิทธิ์ที่ด้านล่างของหน้า
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Nu Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// การกำหนดธีมของ Material-UI โดยเปลี่ยนสีหลักและสีรอง
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // เปลี่ยนสีหลักเป็นสีฟ้า
    },
    secondary: {
      main: '#ff7961',
    },
  },
});

export default function Register() {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [password, setPassword] = useState(""); // เก็บรหัสผ่านที่ผู้ใช้กรอก
  const [confirmPassword, setConfirmPassword] = useState(""); // เก็บการยืนยันรหัสผ่านที่ผู้ใช้กรอก
  const [error, setError] = useState(""); // เก็บข้อความแสดงข้อผิดพลาดกรณีรหัสผ่านไม่ตรงกัน

  // ฟังก์ชันจัดการการส่งฟอร์มเมื่อกดปุ่มลงทะเบียน
  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    // ตรวจสอบว่ารหัสผ่านและการยืนยันรหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
      setError("Passwords do not match"); // ถ้าไม่ตรงจะแสดงข้อความข้อผิดพลาด
      return;
    }
    const data = new FormData(event.currentTarget); // ดึงข้อมูลจากฟอร์มที่ผู้ใช้กรอก

    // สร้างออบเจกต์ tam ที่มีชื่อผู้ใช้และรหัสผ่าน
    const tam = {
      name: data.get("name"),
      password: data.get("password"),
    };

    // เรียกฟังก์ชัน register เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
    register(tam)
      .then((res) => {
        console.log(res); // แสดงผลการตอบกลับใน console
        toast.success(res.data); // แสดงข้อความแจ้งเตือนความสำเร็จ
        navigate("/login"); // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      })
      .catch((err) => console.log(err)); // แสดงข้อผิดพลาดหากเกิดปัญหา
  };

  return (
    <ThemeProvider theme={theme}> {/* ใช้ธีมที่กำหนด */}
      <Grid container component="main" sx={{ height: "100vh", backgroundColor: '#f5f5f5' }}>
        <CssBaseline /> {/* รีเซ็ต CSS */}
        <Grid
          item
          xs={12}
          sm={8}
          md={4}  // ปรับให้ Grid ใช้พื้นที่น้อยลง
          component={Paper}
          elevation={6}
          square
          sx={{
            margin: 'auto', // จัดให้อยู่ตรงกลาง
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3, // กำหนด padding รอบๆ
            backgroundColor: "rgba(255, 255, 255, 0.95)", // สีพื้นหลังแบบโปร่งแสงเล็กน้อย
            borderRadius: 2, // มุมของกล่อง Grid ให้โค้ง
            boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)", // เพิ่มเงาสำหรับการออกแบบ
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}> {/* แสดงไอคอนของการลงทะเบียน */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            สมัครสมาชิก
          </Typography>
          {/* ฟอร์มการสมัครสมาชิก */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="ชื่อผู้ใช้"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)} // เก็บค่ารหัสผ่าน
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="ยืนยันรหัสผ่าน"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={(e) => setConfirmPassword(e.target.value)} // เก็บค่ายืนยันรหัสผ่าน
            />
            {error && ( // ถ้ามีข้อผิดพลาดจะแสดงข้อความ
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} // ปุ่มลงทะเบียน
            >
              ลงทะเบียน
            </Button>
            <Grid container justifyContent="flex-end"> {/* ลิงก์ไปยังหน้าเข้าสู่ระบบ */}
              <Grid item>
                <Link href="/login" variant="body2">
                  ฉันมีบัญชีผู้ใช้แล้ว
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} /> {/* ส่วนแสดงลิขสิทธิ์ที่ด้านล่าง */}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
