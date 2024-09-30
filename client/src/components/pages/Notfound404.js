import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

// กำหนดฟังก์ชันคอมโพเนนต์ Notfound404 ซึ่งรับ props ชื่อ text
export default function Notfound404({ text }) {
  return (
    // ใช้ Box เพื่อจัดการเลย์เอาต์ โดยจัดให้อยู่ตรงกลางทั้งแนวนอนและแนวตั้ง
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // กำหนดความสูงขั้นต่ำเป็นความสูงของหน้าจอ
      }}
    >
      {/* กำหนด Container เพื่อจำกัดความกว้างของเนื้อหา */}
      <Container maxWidth="md">
        {/* ใช้ Grid เพื่อจัดเลย์เอาต์ในรูปแบบกริด */}
        <Grid container spacing={2}>
          {/* ส่วนแรกของกริด，占 6 ช่องของ 12 */}
          <Grid item xs={6}>
            {/* แสดงข้อความ 404 ด้วย Typography ขนาด h1 */}
            <Typography variant="h1">404</Typography>
            {/* แสดงข้อความเพิ่มเติมที่ส่งมาจาก props */}
            <Typography variant="h6">
              {text}
            </Typography>
            {/* ลิงก์ไปยังหน้า /login พร้อมปุ่ม Back Home */}
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button variant="contained">Back Home</Button>
            </Link>
          </Grid>
          {/* ส่วนที่สองของกริด，占 6 ช่องของ 12 */}
          <Grid item xs={6}>
            {/* แสดงรูปภาพที่เกี่ยวข้องกับข้อผิดพลาด */}
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt="Error Illustration"
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
