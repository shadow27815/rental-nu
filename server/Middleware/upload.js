const multer = require('multer'); // นำเข้า multer สำหรับการอัปโหลดไฟล์

// กำหนดการจัดเก็บไฟล์แบบเฉพาะเจาะจง (เช่นสำหรับการอัปโหลดเฉพาะบางประเภท)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // กำหนดตำแหน่งที่จัดเก็บไฟล์ที่อัปโหลด
        cb(null, 'uploads/'); // ไฟล์จะถูกจัดเก็บในโฟลเดอร์ 'uploads/'
    },
    filename: function (req, file, cb) {
        // กำหนดชื่อไฟล์เมื่อจัดเก็บ
        cb(null, Date.now() + '-' + file.originalname); // ชื่อไฟล์จะประกอบด้วย timestamp และชื่อไฟล์ต้นฉบับ
    }
});

// สร้าง middleware สำหรับการอัปโหลดไฟล์ โดยใช้การจัดเก็บที่กำหนด
const upload = multer({ storage: storage });

// กำหนดการจัดเก็บไฟล์แบบทั่วไป
const storageGeneral = multer.diskStorage({
    destination: function (req, file, cb) {
        // กำหนดตำแหน่งที่จัดเก็บไฟล์ที่อัปโหลด
        cb(null, 'uploads/'); // ไฟล์จะถูกจัดเก็บในโฟลเดอร์ 'uploads/'
    },
    filename: function (req, file, cb) {
        // กำหนดชื่อไฟล์เมื่อจัดเก็บ
        cb(null, Date.now() + '-' + file.originalname); // ชื่อไฟล์จะประกอบด้วย timestamp และชื่อไฟล์ต้นฉบับ
    }
});

// สร้าง middleware สำหรับการอัปโหลดไฟล์ทั่วไป โดยใช้การจัดเก็บทั่วไป
const uploadGeneral = multer({ storage: storageGeneral });

// ส่งออก middleware สำหรับการอัปโหลดไฟล์
module.exports = { upload, uploadGeneral };
