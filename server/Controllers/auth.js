const { PrismaClient } = require('@prisma/client'); // นำเข้า PrismaClient สำหรับการเชื่อมต่อกับฐานข้อมูล
const bcrypt = require('bcryptjs'); // นำเข้า bcrypt สำหรับการเข้ารหัสรหัสผ่าน
const jwt = require('jsonwebtoken'); // นำเข้า jsonwebtoken สำหรับการสร้าง JWT

const prisma = new PrismaClient(); // สร้างอินสแตนซ์ PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
exports.register = async (req, res) => {
  try {
    const { name, password } = req.body; // รับข้อมูลจาก request body

    // 1. ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่ในฐานข้อมูล
    const userExists = await prisma.user.findFirst({
      where: { name }, // ค้นหาผู้ใช้ที่มีชื่อเดียวกันในฐานข้อมูล
    });
    if (userExists) {
      return res.status(400).send("User Already Exists!!!"); // ถ้าผู้ใช้มีอยู่แล้ว ส่งข้อความแจ้งกลับไป
    }

    // 2. เข้ารหัสรหัสผ่าน
    const salt = await bcrypt.genSalt(10); // สร้าง salt สำหรับการเข้ารหัส
    const hashedPassword = await bcrypt.hash(password, salt); // เข้ารหัสรหัสผ่านโดยใช้ bcrypt

    // 3. บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        name, // ชื่อผู้ใช้
        password: hashedPassword, // รหัสผ่านที่ถูกเข้ารหัส
      },
    });

    res.send("Register Success!!"); // ส่งข้อความแจ้งว่าลงทะเบียนสำเร็จ
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาดใน console
    res.status(500).send("Server Error"); // ส่งข้อความข้อผิดพลาดกลับไปยัง client
  }
};

// ฟังก์ชันสำหรับการล็อกอินผู้ใช้
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body; // รับข้อมูลชื่อและรหัสผ่านจาก request body

    // 1. ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
    const user = await prisma.user.findFirst({
      where: { name }, // ค้นหาผู้ใช้ตามชื่อที่ป้อนมา
    });

    if (user) {
      // เปรียบเทียบรหัสผ่านที่ป้อนมากับรหัสผ่านที่เก็บไว้ในฐานข้อมูล
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!"); // ถ้ารหัสผ่านไม่ตรงกัน ส่งข้อความแจ้ง
      }

      // 2. สร้าง payload สำหรับ JWT
      const payload = {
        user: {
          name: user.name, // ชื่อผู้ใช้
          role: user.role, // บทบาทของผู้ใช้
        },
      };

      // 3. สร้าง JWT token และส่งกลับไปยัง client
      jwt.sign(payload, "jwtsecret", { expiresIn: "10y" }, (err, token) => {
        if (err) throw err; // ถ้ามีข้อผิดพลาดในการสร้าง token
        res.json({ token, payload }); // ส่ง token และ payload กลับไปยัง client
      });
    } else {
      return res.status(400).send("User not found!!!"); // ถ้าผู้ใช้ไม่พบ ส่งข้อความแจ้งกลับไป
    }
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาดใน console
    res.status(500).send("Server Error"); // ส่งข้อความข้อผิดพลาดกลับไปยัง client
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ปัจจุบัน
exports.currentUser = async (req, res) => {
  try {
    // ค้นหาผู้ใช้ในฐานข้อมูลโดยใช้ชื่อจาก token ที่ถูกส่งมา
    const user = await prisma.user.findFirst({
      where: {
        name: req.user.name, // ค้นหาผู้ใช้โดยใช้ชื่อที่ได้จาก token
      },
      select: {
        id: true, // ดึง id ของผู้ใช้
        name: true, // ดึงชื่อของผู้ใช้
        role: true, // ดึงบทบาทของผู้ใช้
      },
    });

    if (!user) {
      return res.status(404).send('User not found'); // ถ้าไม่พบผู้ใช้ ส่งข้อความแจ้งกลับไป
    }

    res.send(user); // ส่งข้อมูลผู้ใช้กลับไปยัง client
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาดใน console
    res.status(500).send('Server Error'); // ส่งข้อความข้อผิดพลาดกลับไปยัง client
  }
};
