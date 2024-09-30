const express = require('express'); // นำเข้า Express framework เพื่อสร้างเว็บเซิร์ฟเวอร์
const router = express.Router(); // ใช้ Express Router เพื่อจัดการเส้นทาง (routes)

// นำเข้า Controller ที่จัดการฟังก์ชันเกี่ยวกับ Tenant (ผู้เช่า)
const { create, list, read, update, remove, updateStatus } = require('../Controllers/tenantController');

// นำเข้า Middleware สำหรับการอัปโหลดไฟล์
const { uploadGeneral } = require('../Middleware/upload');

// เส้นทางสำหรับการสร้างผู้เช่า (Tenant) พร้อมอัปโหลดไฟล์ (เช่น สลิปการจ่ายเงิน)
// ใช้ middleware uploadGeneral.single('slip') เพื่อจัดการไฟล์ที่อัปโหลด โดยฟิลด์ไฟล์จะชื่อว่า 'slip'
router.post('/tenant', uploadGeneral.single('slip'), create); // เรียกใช้ฟังก์ชัน create เมื่อมีการร้องขอ POST มาที่ '/tenant'

// เส้นทางสำหรับอัปเดตข้อมูลผู้เช่า (Tenant) พร้อมอัปโหลดไฟล์ใหม่
// ใช้ middleware uploadGeneral.single('slip') เพื่ออัปโหลดไฟล์ที่อัปเดต
router.put('/tenant/:id', uploadGeneral.single('slip'), update); // เรียกใช้ฟังก์ชัน update เมื่อมีการร้องขอ PUT มาที่ '/tenant/:id'

// เส้นทางสำหรับดึงรายการผู้เช่าทั้งหมด
router.get('/tenants', list); // เรียกใช้ฟังก์ชัน list เมื่อมีการร้องขอ GET มาที่ '/tenants'

// เส้นทางสำหรับดึงข้อมูลผู้เช่าตาม ID
router.get('/tenant/:id', read); // เรียกใช้ฟังก์ชัน read เมื่อมีการร้องขอ GET มาที่ '/tenant/:id'

// เส้นทางสำหรับลบข้อมูลผู้เช่าตาม ID
router.delete('/tenant/:id', remove); // เรียกใช้ฟังก์ชัน remove เมื่อมีการร้องขอ DELETE มาที่ '/tenant/:id'

// เส้นทางสำหรับอัปเดตสถานะของผู้เช่า
router.put('/tenant/:id/status', updateStatus); // เรียกใช้ฟังก์ชัน updateStatus เมื่อมีการร้องขอ PUT มาที่ '/tenant/:id/status'

module.exports = router;
