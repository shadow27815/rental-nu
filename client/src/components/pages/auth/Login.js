import React from "react";
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
import { useNavigate } from "react-router-dom"; // ใช้เพื่อเปลี่ยนหน้า
import { useDispatch } from "react-redux"; // ใช้เพื่อเรียก action ใน Redux
import { login as loginRedux } from "../../../store/userSlice"; // นำเข้า action login จาก Redux
import { login } from "../../../functions/auth"; // นำเข้าฟังก์ชัน login จากโฟลเดอร์ auth
import { toast } from 'react-toastify'; // ใช้สำหรับแสดงข้อความแจ้งเตือน

// ฟังก์ชัน Copyright แสดงข้อมูลลิขสิทธิ์ที่ด้านล่างของหน้าจอ
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

// การสร้างธีมเพื่อปรับแต่งสีหลักสำหรับ Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // กำหนดสีหลักเป็นสีฟ้า
    },
    secondary: {
      main: '#ff7961', // กำหนดสีรอง
    },
  },
});

// คอมโพเนนต์หลัก Login สำหรับแสดงฟอร์มเข้าสู่ระบบ
export default function Login() {
  const navi = useNavigate(); // ใช้ในการเปลี่ยนหน้า
  const dispatch = useDispatch(); // ใช้สำหรับส่ง action ไปยัง Redux

  // ฟังก์ชันจัดการเมื่อผู้ใช้กดปุ่มเข้าสู่ระบบ
  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าจอ
    const data = new FormData(event.currentTarget); // ดึงข้อมูลจากฟอร์มที่ผู้ใช้กรอก

    const tam = {
      name: data.get("name"), // เก็บชื่อผู้ใช้จากฟอร์ม
      password: data.get("password"), // เก็บรหัสผ่านจากฟอร์ม
    };

    // เรียกฟังก์ชัน login เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
    login(tam)
      .then((res) => {
        console.log(res.data.payload.user.name); // แสดงข้อมูลใน console
        toast.success('User ' + res.data.payload.user.name + ' Login Success'); // แสดงข้อความแจ้งเตือน
        // ส่งข้อมูลผู้ใช้ไปยัง Redux store
        dispatch(
          loginRedux({
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
            token: res.data.token,
          })
        );
        // เก็บ token ใน localStorage
        localStorage.setItem("token", res.data.token);
        // เรียกฟังก์ชัน roleRedirects เพื่อเปลี่ยนเส้นทางตามบทบาทของผู้ใช้
        roleRedirects(res.data.payload.user.role);
      })
      .catch((err) => toast.error(err.response.data, {
        position: 'top-left' // แสดงข้อความแจ้งเตือนในตำแหน่งด้านซ้ายบน
      }));
  };

  // ฟังก์ชัน roleRedirects เพื่อเปลี่ยนหน้าไปยังหน้าที่เหมาะสมตามบทบาทของผู้ใช้
  const roleRedirects = (role) => {
    if (role === "admin") {
      navi("/admin/index"); // ถ้าเป็นแอดมิน เปลี่ยนไปยังหน้า admin
    } else {
      navi("/user/index"); // ถ้าเป็นผู้ใช้ทั่วไป เปลี่ยนไปยังหน้า user
    }
  };

  return (
    <ThemeProvider theme={theme}> {/* ใช้ธีมที่กำหนด */}
      <Grid container component="main" sx={{ height: "100vh", backgroundColor: '#f5f5f5' }}>
        <CssBaseline /> {/* รีเซ็ต CSS */}
        <Grid
          item
          xs={12}
          sm={8}
          md={4} // กำหนดความกว้างของ Grid ให้เข้ากับหน้าจอ
          component={Paper}
          elevation={6} // เพิ่มเงาให้กับ Grid
          square
          sx={{
            margin: 'auto', // จัดให้อยู่ตรงกลาง
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3, // กำหนด padding รอบๆ
            backgroundColor: "rgba(255, 255, 255, 0.95)", // สีพื้นหลัง
            borderRadius: 2,
            boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)", // เพิ่มเงาสำหรับมุมมองที่ดีขึ้น
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}> {/* ไอคอนที่อยู่บนฟอร์ม */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          {/* ฟอร์มเข้าสู่ระบบ */}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              เข้าสู่ระบบ
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* ลิงก์ไปยังหน้าลงทะเบียน */}
                <Link href="/register" variant="body2">
                  ยังไม่มีบัญชีผู้ใช้?
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} /> {/* แสดงลิขสิทธิ์ */}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
