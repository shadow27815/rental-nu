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

const settings = [
  {
    title: "ออกจากระบบ",
    to: "#",
  },
];

function ResponsiveAppBar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    if (idToken) {
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
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/");
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoClick = () => {
    navigate('/user/index');
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
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          {/* /LOGO */}

          {/* Minimize Menu */}
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
                display: { xs: "block", md: "none" },
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

          {/* Menu Left Full */}
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
          {/* /Menu Left Full */}

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-4.png"
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
                <>
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={index}
                      onClick={
                        setting.title === "ออกจากระบบ"
                          ? handleLogout
                          : () => navigate(setting.to)
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
          {/* /User Menu */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
