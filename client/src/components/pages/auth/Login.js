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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../../store/userSlice";
import { login } from "../../../functions/auth";
import { toast } from 'react-toastify';

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // เปลี่ยนสีหลักเป็นสีฟ้าสไตล์ Agoda
    },
    secondary: {
      main: '#ff7961',
    },
  },
});

export default function Login() {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const tam = {
      name: data.get("name"),
      password: data.get("password"),
    };

    login(tam)
      .then((res) => {
        console.log(res.data.payload.user.name);
        toast.success('User ' + res.data.payload.user.name + ' Login Success');
        dispatch(
          loginRedux({
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        roleRedirects(res.data.payload.user.role); // เรียกฟังก์ชัน roleRedirects หลังล็อกอินสำเร็จ
      })
      .catch((err) => toast.error(err.response.data, {
        position: 'top-left'
      }));
  };

  const roleRedirects = (role) => {
    if (role === "admin") {
      navi("/admin/index"); // ไม่ใช้ replace: true เพื่อให้สามารถกลับไปหน้าก่อนหน้าได้
    } else {
      navi("/user/index"); // ไม่ใช้ replace: true เพื่อให้สามารถกลับไปหน้าก่อนหน้าได้
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", backgroundColor: '#f5f5f5' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={4}  // ปรับให้ Grid ใช้พื้นที่น้อยลง
          component={Paper}
          elevation={6}
          square
          sx={{
            margin: 'auto',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 2,
            boxShadow: "0 3px 5px 2px rgba(105, 135, 255, .3)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
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
                <Link href="/register" variant="body2">
                  ยังไม่มีบัญชีผู้ใช้?
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
