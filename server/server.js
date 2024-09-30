const express = require('express'); // นำเข้า Express framework เพื่อจัดการกับ HTTP requests
const morgan = require('morgan'); // นำเข้า morgan สำหรับการ log การร้องขอ HTTP
const cors = require('cors'); // นำเข้า CORS เพื่ออนุญาตการเชื่อมต่อจากแหล่งที่มาภายนอก
const bodyParser = require('body-parser'); // นำเข้า bodyParser เพื่อจัดการกับข้อมูลใน body ของคำขอ
const { readdirSync } = require('fs'); // นำเข้า readdirSync เพื่ออ่านไฟล์จากระบบไฟล์

const app = express(); // สร้างอินสแตนซ์ของ Express

// Middleware
app.use(morgan('dev')); // ใช้ morgan ในการ log การร้องขอ HTTP โดยแสดงผลแบบ 'dev' ซึ่งจะแสดงข้อมูลสรุป
app.use(cors()); // เปิดใช้งาน CORS เพื่ออนุญาตการเข้าถึงจากทุกโดเมน
app.use(bodyParser.json({ limit: '10mb' })); // ใช้ bodyParser เพื่อจัดการกับ JSON ที่ส่งมาพร้อมกับคำขอ โดยจำกัดขนาดสูงสุดที่ 10MB
app.use('/uploads', express.static('uploads')); // เปิดให้เข้าถึงไฟล์ในโฟลเดอร์ 'uploads' ผ่าน URL '/uploads'

// โหลด routes โดยอัตโนมัติจากโฟลเดอร์ 'routes'
readdirSync('./routes').forEach(file => {
    if (file.endsWith('.js')) { // ตรวจสอบว่าไฟล์นั้นเป็นไฟล์ JavaScript (.js)
        const route = require(`./routes/${file}`); // นำเข้า route แต่ละไฟล์
        app.use('/api', route); // ใช้ route โดยกำหนดเส้นทางเริ่มต้นเป็น '/api'
    }
});

const PORT = process.env.PORT || 5000; // กำหนดพอร์ตที่เซิร์ฟเวอร์จะรัน โดยใช้จาก environment variable หรือค่าเริ่มต้น 5000

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // เริ่มต้นเซิร์ฟเวอร์และ log ว่ากำลังรันอยู่ที่พอร์ตใด
