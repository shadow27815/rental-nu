import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { currentAdmin } from "../functions/auth";
import Notfound404 from "../components/pages/Notfound404";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);  // เพิ่มสถานะการโหลด

  useEffect(() => {
    if (user && user.user.name && user.user.token) {
      currentAdmin(user.user.token)
        .then((r) => {
          setOk(true);
          setLoading(false);  // การตรวจสอบเสร็จสิ้น
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
          setLoading(false);  // การตรวจสอบเสร็จสิ้น แต่ไม่ผ่าน
        });
    } else {
      setLoading(false);  // ไม่มีข้อมูลผู้ใช้
    }
  }, [user]);

  const text = "No Permission!!!";

  if (loading) {
    return <div>Loading...</div>;  // แสดง Loading component ขณะกำลังตรวจสอบ
  }

  return ok ? (
    <div className="app" style={{ display: 'flex', height: '100vh' }}>
      <SideBar />
      <main className="content" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div className="content_body" style={{ flex: 1, overflow: 'auto' }}>
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : (
    <Notfound404 text={text} />
  );
};

export default AdminRoute;
