import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // ใช้ Styled Components สำหรับการจัดการ CSS
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'; // นำเข้า components จาก Material UI
import axios from 'axios'; // ใช้ axios สำหรับการดึงข้อมูลจาก API
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // นำเข้า components ของ recharts สำหรับการสร้างกราฟแท่ง

// สร้าง container ของหน้าโดยใช้ styled-components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh; // ทำให้ container มีความสูงเต็มหน้าจอ
`;

// สร้างส่วนหัวของแดชบอร์ด
const DashboardTitle = styled(Typography)`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

// สร้างคอมโพเนนต์ StatCard สำหรับแสดงข้อมูลสถิติต่าง ๆ เช่น ผู้ใช้ทั้งหมด
const StatCard = ({ title, value }) => (
  <Card sx={{ width: '100%' }}> {/* ใช้ Material UI Card สำหรับแสดงข้อมูล */}
    <CardContent>
      <Typography variant="h6" component="div">
        {title} {/* แสดงชื่อหัวข้อของข้อมูลสถิติ */}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value} {/* แสดงค่าของข้อมูลสถิติ */}
      </Typography>
    </CardContent>
  </Card>
);

// ข้อมูลสำหรับกราฟรายได้ประจำเดือน
const data = [
  { name: 'JAN 01', income: 4 },
  { name: 'FEB 02', income: 3, },
  { name: 'MAR 03', income: 2 },
  { name: 'APR 04', income: 2.78 },
  { name: 'MAY 05', income: 1.89 },
  { name: 'JUN 06', income: 2.39 },
  { name: 'JUL 07', income: 3.49 },
];

// คอมโพเนนต์หลักของหน้าแดชบอร์ด
const HomePageAdmin = () => {
  const [summary, setSummary] = useState({}); // สร้าง state สำหรับเก็บข้อมูลสรุป (summary)

  // useEffect สำหรับการดึงข้อมูลสรุปเมื่อ component mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/summary'); // ดึงข้อมูล summary จาก API
        console.log('Summary fetched:', response.data);
        setSummary(response.data); // เก็บข้อมูล summary ใน state
      } catch (error) {
        console.error('Error fetching summary:', error); // แสดง error หากเกิดปัญหาในการดึงข้อมูล
      }
    };

    fetchSummary();
  }, []); // ใช้ [] เพื่อให้ฟังก์ชันนี้ทำงานแค่ครั้งเดียวเมื่อ mount

  return (
    <PageContainer>
      <DashboardTitle>หน้าแดชบอร์ดแสดงข้อมูลโดยรวม</DashboardTitle>
      <Grid container spacing={3}> {/* Grid จาก Material UI ใช้สำหรับจัด layout */}
        {/* แสดงข้อมูลสถิติต่าง ๆ ด้วย StatCard */}
        <Grid item xs={12} md={4}>
          <StatCard title="ผู้ใช้ทั้งหมด" value={summary.totalUsers} /> {/* แสดงข้อมูลจำนวนผู้ใช้ */}
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="พื้นที่ทั้งหมด" value={summary.totalProducts} /> {/* แสดงข้อมูลจำนวนพื้นที่ */}
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="แบบฟอร์มทั้งหมด" value={summary.totalTenants} /> {/* แสดงข้อมูลจำนวนแบบฟอร์ม */}
        </Grid>

        {/* แสดงกราฟรายได้ประจำเดือน */}
        <Grid item xs={12}>
          <Card sx={{ width: '100%', marginTop: '20px' }}> {/* ใช้ Card สำหรับกราฟ */}
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                รายได้โดยรวมแต่ละเดือน (ล้านบาท) {/* หัวข้อของกราฟ */}
              </Typography>
              <ResponsiveContainer width="100%" height={300}> {/* ทำให้กราฟ responsive */}
                <BarChart data={data}> {/* กำหนดข้อมูลสำหรับกราฟ */}
                  <CartesianGrid strokeDasharray="3 3" /> {/* กริดในกราฟ */}
                  <XAxis dataKey="name" /> {/* แกน X แสดงชื่อเดือน */}
                  <YAxis
                    tickFormatter={(value) => `${value}M`} // ฟอร์แมตตัวเลขให้เป็นหน่วยล้านบาท
                  />
                  <Tooltip formatter={(value) => `${value} ล้าน`} /> {/* แสดง tooltip เมื่อ hover */}
                  <Legend />
                  <Bar dataKey="income" fill="#8884d8" name="รายได้" barSize={30} /> {/* กราฟแท่งแสดงรายได้ */}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HomePageAdmin; // ส่งออกคอมโพเนนต์นี้ให้ใช้ในที่อื่น
