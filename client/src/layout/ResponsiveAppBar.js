import React, { useState, useMemo, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/userSlice";
import { currentUser } from "../functions/auth";

// รายการของเมนูในหน้าแอป
const pages = [
  {
    title: "หน้าแผนที่",
    to: "/map",
  },
  {
    title: "ดูข้อมูลแบบฟอร์ม",
    to: "/user/forms",
  },
  {
    title: "ช่องทางการติดต่อ",
    to: "/contract",
  },
  {
    title: "ปฏิทิน",
    to: "/calendar",
  },
];

// รายการของเมนูสำหรับการเข้าสู่ระบบ/สมัครสมาชิก
const authen = [
  {
    title: "สมัครสมาชิก",
    to: "/register",
  },
  {
    title: "เข้าสู่ระบบ",
    to: "/login",
  },
];

// เมนูการตั้งค่าของผู้ใช้เมื่อเข้าสู่ระบบแล้ว
const settings = [
  {
    title: "ออกจากระบบ",
    to: "#",
  },
];

function ResponsiveAppBar() {
  const { user } = useSelector((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store
  const dispatch = useDispatch(); // สร้างฟังก์ชัน dispatch สำหรับส่ง action ไปยัง Redux
  const navigate = useNavigate(); // ใช้เพื่อเปลี่ยนเส้นทางไปยังหน้าต่างๆ

  const memoizedUser = useMemo(() => user, [user]); // แคชข้อมูลผู้ใช้เพื่อเพิ่มประสิทธิภาพ

  // ดึงโทเค็นจาก localStorage เพื่อเช็คสถานะการเข้าสู่ระบบ
  useEffect(() => {
    const idToken = localStorage.getItem("token"); // ดึงโทเค็นจาก localStorage
    if (idToken) {
      // ตรวจสอบโทเค็นและดึงข้อมูลผู้ใช้
      currentUser(idToken)
        .then((res) => {
          dispatch(
            login({
              name: res.data.name,
              role: res.data.role,
              token: idToken,
            })
          );
        })
        .catch((err) => console.log(err)); // แสดงข้อผิดพลาดถ้ามี
    }
  }, [dispatch]);

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    dispatch(logout()); // ส่ง action logout เพื่อออกจากระบบ
    handleCloseUserMenu(); // ปิดเมนูผู้ใช้
    navigate("/"); // เปลี่ยนหน้าไปยังหน้าหลัก
  };

  const [anchorElNav, setAnchorElNav] = useState(null); // สถานะของเมนูนำทาง
  const [anchorElUser, setAnchorElUser] = useState(null); // สถานะของเมนูผู้ใช้

  // เปิดเมนูนำทาง
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // เปิดเมนูผู้ใช้
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // ปิดเมนูนำทาง
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // ปิดเมนูผู้ใช้
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ฟังก์ชันจัดการเมื่อคลิกโลโก้
  const handleLogoClick = () => {
    navigate('/user/index'); // นำทางไปยังหน้า user index
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", boxShadow: "none", borderBottom: "1px solid #E0E0E0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <IconButton onClick={handleLogoClick} sx={{ p: 0 }}>
            <Avatar
              alt="NU Logo"
              src="https://www.nu.ac.th/wp-content/uploads/2023/09/NULOGO-Download.png"
              sx={{ width: 40, height: 40 }} // ตั้งขนาดโลโก้
            />
          </IconButton>
          {/* /LOGO */}

          {/* Minimize Menu สำหรับจอเล็ก */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }, // แสดงเฉพาะบนหน้าจอขนาดเล็ก
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.to} style={{ textDecoration: "none", color: "black" }}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* /Minimize Menu */}

          {/* เมนูเต็มรูปแบบสำหรับหน้าจอขนาดใหญ่ */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {pages.map((page, index) => (
              <Link to={page.to} key={index} style={{ textDecoration: "none", color: "#555555", margin: "0 20px" }}>
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ color: "#555555", fontSize: "1rem", fontWeight: 500 }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          {/* /เมนูเต็มรูปแบบ */}

          {/* เมนูผู้ใช้ */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-4.png" // ไอคอนเมนูผู้ใช้
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* ถ้าผู้ใช้ยังไม่ได้เข้าสู่ระบบ */}
              {memoizedUser.length === 0 ? (
                <>
                  {authen.map((authItem, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Link to={authItem.to} style={{ textDecoration: "none", color: "black" }}>
                        <Typography textAlign="center">{authItem.title}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </>
              ) : (
                // ถ้าผู้ใช้เข้าสู่ระบบแล้ว
                <>
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={index}
                      onClick={
                        setting.title === "ออกจากระบบ"
                          ? handleLogout // ถ้าผู้ใช้คลิก "ออกจากระบบ"
                          : () => navigate(setting.to) // เมนูอื่นๆ
                      }
                    >
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>
          </Box>
          {/* /เมนูผู้ใช้ */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
