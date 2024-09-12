import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; // ไอคอนรูปฟอร์ม

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: 'hidden' }}>
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        style={{ height: "100%", overflowY: "auto", backgroundColor: '#A0522D' }} // เปลี่ยนสีพื้นหลังของ Sidebar
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, marginBottom: "32px", overflowY: "auto" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{ margin: "10px 0 20px 0" }}
              >
                {!isCollapsed && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                    <Typography>ADMIN PAGES</Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`/assets/NULOGO-Download.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                </Box>
              )}

              <Link to="/admin/index" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />} style={{ color: '#000' }}>Dashboard</MenuItem>
              </Link>

              <SubMenu icon={<MapOutlinedIcon />} label="Data">
                <Link to={"/admin/viewtable"} className="menu-bars">
                  <MenuItem icon={<TableViewIcon />}>
                    Table
                  </MenuItem>
                </Link>
              </SubMenu>

              <SubMenu label="Forms" icon={<AssignmentOutlinedIcon />}> {/* เปลี่ยนเป็น Forms และใช้ไอคอน AssignmentOutlinedIcon */}
                <Link to={"/admin/tenants"} className="menu-bars">
                  <MenuItem icon={<ListAltIcon />}>Tenants</MenuItem>
                </Link>
              </SubMenu>
            </Menu>

            <div style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu>
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
              <MenuItem icon={<LogoutIcon />} onClick={handleLogout} style={{ marginTop: '16px' }}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main style={{ flex: 1, overflow: "auto", width: "100%", backgroundColor: '#F5F5F5' }}>
        <div style={{ padding: "16px 2px", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
        {/* Content goes here */}
      </main>
    </div>
  );
};

export default SideBar;
