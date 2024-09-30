const express = require("express"); // นำเข้า Express framework เพื่อสร้างเว็บเซิร์ฟเวอร์
const router = express.Router(); // ใช้ Router ของ Express เพื่อจัดการเส้นทาง (routes)

const {
  register,
  login,
  currentUser,
} = require("../Controllers/auth"); // นำเข้า Controllers สำหรับการจัดการการลงทะเบียน, ล็อกอิน และข้อมูลผู้ใช้ปัจจุบัน

const { auth, adminCheck } = require("../Middleware/auth"); // นำเข้า Middleware สำหรับตรวจสอบความถูกต้องของ JWT (auth) และตรวจสอบสิทธิ์ของ admin (adminCheck)

// กำหนดเส้นทาง (routes) สำหรับการลงทะเบียนผู้ใช้
// http://localhost:5000/api/register
router.post("/register", register); // เรียกใช้ฟังก์ชัน register เมื่อมีคำขอ POST มาที่ "/register"

// กำหนดเส้นทางสำหรับการล็อกอินผู้ใช้
router.post("/login", login); // เรียกใช้ฟังก์ชัน login เมื่อมีคำขอ POST มาที่ "/login"

// กำหนดเส้นทางสำหรับการดึงข้อมูลผู้ใช้ปัจจุบัน
// ต้องผ่านการตรวจสอบ token ด้วย middleware "auth"
router.post("/current-user", auth, currentUser); // เรียกใช้ฟังก์ชัน currentUser เมื่อมีคำขอ POST มาที่ "/current-user" หลังจากตรวจสอบ JWT ผ่านแล้ว

// กำหนดเส้นทางสำหรับการดึงข้อมูล admin ปัจจุบัน
// ต้องผ่านการตรวจสอบ token ด้วย middleware "auth" และตรวจสอบสิทธิ์ admin ด้วย "adminCheck"
router.post("/current-admin", auth, adminCheck, currentUser); // เรียกใช้ฟังก์ชัน currentUser เมื่อมีคำขอ POST มาที่ "/current-admin" หลังจากผ่านการตรวจสอบ JWT และสิทธิ์ admin

module.exports = router;