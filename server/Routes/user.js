const express = require("express");
const router = express.Router();

const { list, changeRole, getUserForms } = require("../Controllers/user"); 
const { auth, adminCheck } = require("../Middleware/auth");

// เส้นทางสำหรับการเรียกใช้แต่ละฟังก์ชัน
router.get("/user", auth, adminCheck, list); // สำหรับการดึงรายชื่อผู้ใช้ทั้งหมด (admin only)
router.post("/change-role", auth, adminCheck, changeRole); // สำหรับการเปลี่ยนบทบาทผู้ใช้ (admin only)
router.get("/user/forms", auth, getUserForms); // สำหรับการดึงแบบฟอร์มของผู้ใช้ที่เข้าสู่ระบบ

module.exports = router;
