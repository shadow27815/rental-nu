const express = require('express'); // นำเข้า Express framework เพื่อสร้างเว็บเซิร์ฟเวอร์
const router = express.Router(); // ใช้ Express Router เพื่อจัดการเส้นทาง (routes)
const { PrismaClient } = require('@prisma/client'); // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล

const prisma = new PrismaClient(); // สร้างอินสแตนซ์ของ PrismaClient เพื่อใช้ในการ query ฐานข้อมูล

// เส้นทางสำหรับดึงข้อมูลสรุปทั้งหมด (Summary)
// ดึงจำนวนของ products, tenants, และ users จากฐานข้อมูล
router.get('/summary', async (req, res) => {
    try {
        // ดึงจำนวนของ Products ทั้งหมดจากฐานข้อมูล
        const totalProducts = await prisma.product.count();

        // ดึงจำนวนของ Tenants ทั้งหมดจากฐานข้อมูล
        const totalTenants = await prisma.tenant.count();

        // ดึงจำนวนของ Users ทั้งหมดจากฐานข้อมูล
        const totalUsers = await prisma.user.count();

        // สร้างออบเจกต์ summary เพื่อสรุปข้อมูล
        const summary = {
            totalProducts, // จำนวน Products
            totalTenants, // จำนวน Tenants
            totalUsers, // จำนวน Users
        };

        res.json(summary); // ส่งข้อมูล summary กลับไปยัง client ในรูปแบบ JSON
    } catch (error) {
        // จัดการข้อผิดพลาดกรณีเกิดปัญหาในการดึงข้อมูลจากฐานข้อมูล
        res.status(500).json({ message: 'Error retrieving summary' });
    }
});

module.exports = router;
