import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice"; // action logout จาก Redux

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar"; // ใช้ react-pro-sidebar สำหรับจัดการ Sidebar

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; // ไอคอนสำหรับ Dashboard
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"; // ไอคอนปฏิทิน
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; // ไอคอนเมนู
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView'; // ไอคอนตาราง
import ListAltIcon from '@mui/icons-material/ListAlt'; // ไอคอนรายการ
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout'; // ไอคอนออกจากระบบ
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; // ไอคอนสำหรับฟอร์ม

const SideBar = () => {
  const dispatch = useDispatch(); // ใช้ dispatch ส่ง action ไปยัง Redux
  const navigate = useNavigate(); // ใช้ navigate สำหรับการเปลี่ยนหน้า
  const [isCollapsed, setIsCollapsed] = useState(false); // state สำหรับพับ/แสดง Sidebar
  const [toggled, setToggled] = useState(false); // state สำหรับแสดง Sidebar ในอุปกรณ์เล็ก
  const [broken, setBroken] = useState(false); // state สำหรับตรวจสอบ breakpoint

  // ฟังก์ชันจัดการเมื่อผู้ใช้กดปุ่มออกจากระบบ
  const handleLogout = () => {
    dispatch(logout()); // เรียก action logout เพื่อออกจากระบบ
    navigate("/"); // นำทางผู้ใช้กลับไปหน้าหลัก
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: 'hidden' }}>
      <Sidebar
        collapsed={isCollapsed} // ควบคุมการพับ/ขยาย Sidebar
        toggled={toggled} // ควบคุมการแสดง Sidebar ในอุปกรณ์เล็ก
        onBackdropClick={() => setToggled(false)} // ปิด Sidebar เมื่อคลิกนอก Sidebar
        onBreakPoint={setBroken} // ตั้งค่า breakPoint สำหรับอุปกรณ์ขนาดเล็ก
        breakPoint="md"
        style={{ height: "100%", overflowY: "auto", backgroundColor: '#A0522D' }} // เปลี่ยนสีพื้นหลังของ Sidebar
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, marginBottom: "32px", overflowY: "auto" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)} // สลับการพับ/ขยาย Sidebar
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} // แสดงไอคอนเมนูเมื่อ Sidebar ถูกพับ
                style={{ margin: "10px 0 20px 0" }}
              >
                {/* ถ้าไม่พับ Sidebar จะแสดงชื่อ ADMIN PAGES */}
                {!isCollapsed && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                    <Typography>ADMIN PAGES</Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}> {/* ปุ่มพับ Sidebar */}
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {/* แสดงรูปโปรไฟล์เมื่อ Sidebar ไม่ถูกพับ */}
              {!isCollapsed && (
                <Box mb="25px">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`/assets/NULOGO-Download.png`} // แสดงรูปโลโก้
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                </Box>
              )}

              {/* ลิงก์ไปยังหน้า Dashboard */}
              <Link to="/admin/index" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />} style={{ color: '#000' }}>Dashboard</MenuItem>
              </Link>

              {/* SubMenu สำหรับ Data */}
              <SubMenu icon={<MapOutlinedIcon />} label="Data">
                <Link to={"/admin/viewtable"} className="menu-bars">
                  <MenuItem icon={<TableViewIcon />}>
                    Table {/* ลิงก์ไปยังหน้าตาราง */}
                  </MenuItem>
                </Link>
              </SubMenu>

              {/* SubMenu สำหรับ Forms */}
              <SubMenu label="Forms" icon={<AssignmentOutlinedIcon />}> {/* ใช้ไอคอน AssignmentOutlinedIcon */}
                <Link to={"/admin/tenants"} className="menu-bars">
                  <MenuItem icon={<ListAltIcon />}>Tenants</MenuItem> {/* ลิงก์ไปยังหน้าผู้เช่า */}
                </Link>
              </SubMenu>
            </Menu>

            {/* ส่วน Extra */}
            <div style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra {/* ส่วนแสดงข้อความ Extra */}
              </Typography>
            </div>

            {/* เมนูเพิ่มเติม เช่น ปฏิทิน และออกจากระบบ */}
            <Menu>
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem> {/* เมนูปฏิทิน */}
              <MenuItem icon={<LogoutIcon />} onClick={handleLogout} style={{ marginTop: '16px' }}>
                Logout {/* เมนูออกจากระบบ */}
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>

      {/* ส่วนเนื้อหาหลัก */}
      <main style={{ flex: 1, overflow: "auto", width: "100%", backgroundColor: '#F5F5F5' }}>
        <div style={{ padding: "16px 2px", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {/* แสดงปุ่มเมนูเมื่อหน้าจอเล็ก */}
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
        {/* เนื้อหาหลักของหน้าแสดงที่นี่ */}
      </main>
    </div>
  );
};

export default SideBar;
