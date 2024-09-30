const express = require("express"); // นำเข้า Express framework เพื่อสร้างเว็บเซิร์ฟเวอร์
const router = express.Router(); // ใช้ Express Router เพื่อจัดการเส้นทาง (routes)

// นำเข้าฟังก์ชันจาก Controller ที่ใช้ในการจัดการผู้ใช้ (User)
const { list, changeRole, getUserForms } = require("../Controllers/user");

// นำเข้า Middleware สำหรับการตรวจสอบสิทธิ์และบทบาท
const { auth, adminCheck } = require("../Middleware/auth");

// เส้นทางสำหรับการดึงรายชื่อผู้ใช้ทั้งหมด (admin เท่านั้นที่สามารถเข้าถึงได้)
// auth และ adminCheck จะตรวจสอบสิทธิ์ของผู้ใช้และตรวจสอบว่าเป็น admin ก่อน
router.get("/user", auth, adminCheck, list); // เรียกใช้ฟังก์ชัน list เมื่อมีการร้องขอ GET มาที่ '/user'

// เส้นทางสำหรับการเปลี่ยนบทบาทผู้ใช้ (admin เท่านั้นที่สามารถเข้าถึงได้)
// ต้องผ่านการตรวจสอบ token (auth) และสิทธิ์ admin ก่อนถึงจะสามารถเปลี่ยนบทบาทได้
router.post("/change-role", auth, adminCheck, changeRole); // เรียกใช้ฟังก์ชัน changeRole เมื่อมีการร้องขอ POST มาที่ '/change-role'

// เส้นทางสำหรับการดึงแบบฟอร์มของผู้ใช้ที่เข้าสู่ระบบ (เฉพาะผู้ใช้ที่ล็อกอินเท่านั้น)
// auth จะตรวจสอบว่า token ของผู้ใช้ถูกต้องหรือไม่ ก่อนจะให้ดึงแบบฟอร์มได้
router.get("/user/forms", auth, getUserForms); // เรียกใช้ฟังก์ชัน getUserForms เมื่อมีการร้องขอ GET มาที่ '/user/forms'

module.exports = router;
