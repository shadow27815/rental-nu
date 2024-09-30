import React from "react";
import { useSelector } from "react-redux"; // ดึงข้อมูลผู้ใช้จาก Redux store
import { Navigate } from "react-router-dom"; // ใช้ Navigate เพื่อเปลี่ยนเส้นทางไปหน้าอื่น

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state })); // ดึงข้อมูลผู้ใช้จาก Redux store

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่ โดยเช็คว่ามีข้อมูลชื่อผู้ใช้และโทเค็นหรือไม่
  return user && user.user.name && user.user.token ? (
    <>
      {children} {/* ถ้าผู้ใช้ล็อกอินแล้ว แสดงเนื้อหาที่ถูกส่งเข้ามา */}
    </>
  ) : (
    // ถ้าผู้ใช้ไม่ได้ล็อกอิน เปลี่ยนเส้นทางไปที่หน้าล็อกอิน โดยใช้ replace: true เพื่อแทนที่เส้นทางใน history
    <Navigate to="/login" replace={true} />
  );
};

export default UserRoute;
