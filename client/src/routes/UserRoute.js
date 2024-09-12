import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
  return user && user.user.name && user.user.token ? (
    <>
      {children} {/* แสดงเนื้อหาเฉพาะหน้าที่ถูกเรียก */}
    </>
  ) : (
    // ถ้าไม่ได้ล็อกอิน ให้เปลี่ยนเส้นทางไปที่หน้าล็อกอิน โดยใช้ replace: true
    <Navigate to="/login" replace={true} />
  );
};

export default UserRoute;
