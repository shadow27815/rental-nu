const express = require("express"); // นำเข้า Express framework เพื่อจัดการการร้องขอ HTTP
const router = express.Router(); // ใช้ Express Router เพื่อจัดการเส้นทาง (routes)

// นำเข้าฟังก์ชันควบคุม (Controller) สำหรับการจัดการ Product (พื้นที่)
const { read, list, create, update, remove, listby } = require('../Controllers/product');

// middleware สำหรับการอัปโหลดไฟล์
const { upload } = require('../Middleware/upload');

// Routes

// เส้นทางสำหรับดึงรายการทั้งหมดของ products
router.get('/product', list); // เรียกใช้ฟังก์ชัน list เมื่อมีการร้องขอ GET มาที่ '/product'

// เส้นทางสำหรับดึงรายการ product โดยเงื่อนไข
router.post('/productby', listby); // เรียกใช้ฟังก์ชัน listby เมื่อมีการร้องขอ POST มาที่ '/productby'

// เส้นทางสำหรับดึงข้อมูล product ตาม ID
router.get('/product/:id', read); // เรียกใช้ฟังก์ชัน read เมื่อมีการร้องขอ GET มาที่ '/product/:id'

// เส้นทางสำหรับสร้าง product ใหม่
// ใช้ middleware 'upload.single()' สำหรับการอัปโหลดไฟล์ โดยกำหนดว่า 'file' เป็นชื่อฟิลด์ในฟอร์ม
router.post('/product', upload.single('file'), create); // เรียกใช้ฟังก์ชัน create เมื่อมีการร้องขอ POST มาที่ '/product'

// เส้นทางสำหรับอัปเดตข้อมูล product
// ใช้ middleware 'upload.single()' สำหรับอัปโหลดไฟล์ โดยกำหนดว่า 'file' เป็นชื่อฟิลด์ในฟอร์ม
router.put('/product/:id', upload.single('file'), update); // เรียกใช้ฟังก์ชัน update เมื่อมีการร้องขอ PUT มาที่ '/product/:id'

// เส้นทางสำหรับลบ product ตาม ID
router.delete('/product/:id', remove); // เรียกใช้ฟังก์ชัน remove เมื่อมีการร้องขอ DELETE มาที่ '/product/:id'

module.exports = router;