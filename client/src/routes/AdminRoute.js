import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar"; // นำเข้า Sidebar
import { Box } from "@mui/material";
import { useSelector } from "react-redux"; // ใช้ useSelector เพื่อดึงข้อมูลจาก Redux store
import { currentAdmin } from "../functions/auth"; // ฟังก์ชันตรวจสอบสถานะ Admin
import Notfound404 from "../components/pages/Notfound404"; // นำเข้าหน้าข้อความไม่อนุญาต

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state })); // ดึงข้อมูลผู้ใช้จาก Redux store
  const [ok, setOk] = useState(false); // สถานะการตรวจสอบสิทธิ์เป็น Admin
  const [loading, setLoading] = useState(true);  // สถานะการโหลดข้อมูล

  // ใช้ useEffect ในการตรวจสอบสถานะผู้ใช้เมื่อ component โหลดขึ้นมา
  useEffect(() => {
    if (user && user.user.name && user.user.token) {
      // ถ้ามีข้อมูลผู้ใช้และโทเค็น จะตรวจสอบว่าผู้ใช้เป็น Admin หรือไม่
      currentAdmin(user.user.token)
        .then((r) => {
          setOk(true); // ถ้าผู้ใช้เป็น Admin
          setLoading(false);  // สิ้นสุดการโหลด
        })
        .catch((err) => {
          console.log(err); // แสดงข้อผิดพลาดถ้าการตรวจสอบล้มเหลว
          setOk(false); // ไม่ใช่ Admin
          setLoading(false);  // สิ้นสุดการโหลด
        });
    } else {
      setLoading(false);  // ไม่มีข้อมูลผู้ใช้
    }
  }, [user]); // ขึ้นอยู่กับข้อมูลผู้ใช้ใน Redux store

  const text = "No Permission!!!"; // ข้อความที่จะแสดงเมื่อไม่มีสิทธิ์

  // ถ้ากำลังโหลดอยู่ แสดงข้อความ Loading
  if (loading) {
    return <div>Loading...</div>;  // แสดง Loading component ขณะกำลังตรวจสอบ
  }

  // ถ้าผู้ใช้เป็น Admin แสดง Sidebar และเนื้อหา
  return ok ? (
    <div className="app" style={{ display: 'flex', height: '100vh' }}>
      <SideBar /> {/* แสดง Sidebar */}
      <main className="content" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div className="content_body" style={{ flex: 1, overflow: 'auto' }}>
          <Box m="20px">{children}</Box> {/* แสดงเนื้อหาหลักของหน้าผู้ดูแลระบบ */}
        </div>
      </main>
    </div>
  ) : (
    // ถ้าผู้ใช้ไม่ใช่ Admin แสดงหน้าไม่อนุญาต
    <Notfound404 text={text} />
  );
};

export default AdminRoute;
