const jwt = require('jsonwebtoken'); // นำเข้า jsonwebtoken เพื่อจัดการกับ JWT
const { PrismaClient } = require('@prisma/client'); // นำเข้า PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล

const prisma = new PrismaClient(); // สร้างอินสแตนซ์ PrismaClient

// Middleware สำหรับการตรวจสอบความถูกต้องของ JWT
exports.auth = async (req, res, next) => {
    try {
        // ดึง token จาก headers ของคำขอ
        const token = req.headers["authtoken"];
        if (!token) {
            return res.status(401).send('No token'); // ถ้าไม่มี token ส่งกลับ status 401
        }

        // ตรวจสอบความถูกต้องของ token โดยใช้ jwt.verify
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded.user; // นำข้อมูลผู้ใช้ที่ถูกถอดรหัสใส่ใน req.user

        next(); // ดำเนินการต่อไปยังฟังก์ชันถัดไป
    } catch (err) {
        console.log(err); // แสดงข้อผิดพลาดใน console
        res.status(500).send('Token Invalid'); // ถ้า token ไม่ถูกต้อง ส่งข้อความแจ้งข้อผิดพลาด
    }
};

// Middleware สำหรับการตรวจสอบสิทธิ์การเข้าถึงของ Admin
exports.adminCheck = async (req, res, next) => {
    try {
        // ค้นหาผู้ใช้ในฐานข้อมูลตามชื่อที่ได้จาก token
        const userAdmin = await prisma.user.findFirst({
            where: {
                name: req.user.name, // ดึงชื่อผู้ใช้จาก req.user
            },
            select: {
                role: true, // เลือกเฉพาะฟิลด์ role
            },
        });

        // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
        if (userAdmin?.role !== 'admin') {
            return res.status(403).send('Admin access Denied!!!'); // ถ้าไม่ใช่ admin ส่งกลับ status 403
        } else {
            next(); // ถ้าเป็น admin ให้ดำเนินการต่อไปยังฟังก์ชันถัดไป
        }
    } catch (err) {
        console.log(err); // แสดงข้อผิดพลาดใน console
        res.status(403).send('Admin access Denied!!!'); // ถ้าตรวจสอบล้มเหลว ส่งข้อความแจ้งข้อผิดพลาด
    }
};
