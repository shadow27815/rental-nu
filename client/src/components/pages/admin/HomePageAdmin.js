import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh;
`;

const DashboardTitle = styled(Typography)`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StatCard = ({ title, value }) => (
  <Card sx={{ width: '100%' }}>
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const data = [
  { name: 'JAN 01', income: 4 },
  { name: 'FEB 02', income: 3, },
  { name: 'MAR 03', income: 2 },
  { name: 'APR 04', income: 2.78 },
  { name: 'MAY 05', income: 1.89 },
  { name: 'JUN 06', income: 2.39 },
  { name: 'JUL 07', income: 3.49 },
];

const HomePageAdmin = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/summary');
        console.log('Summary fetched:', response.data);
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <PageContainer>
      <DashboardTitle>หน้าแดชบอร์ดแสดงข้อมูลโดยรวม</DashboardTitle>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="ผู้ใช้ทั้งหมด" value={summary.totalUsers} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="พื้นที่ทั้งหมด" value={summary.totalProducts} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="แบบฟอร์มทั้งหมด" value={summary.totalTenants} />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ width: '100%', marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                รายได้โดยรวมแต่ละเดือน (ล้านบาท)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) => `${value}M`} // แสดงค่าในหน่วยล้านบาท
                  />
                  <Tooltip formatter={(value) => `${value} ล้าน`} />
                  <Legend />
                  <Bar dataKey="income" fill="#8884d8" name="รายได้" barSize={30} /> {/* ปรับขนาดของแท่งกราฟด้วย barSize */}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HomePageAdmin;
