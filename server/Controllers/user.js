const { PrismaClient } = require('@prisma/client'); // นำเข้า PrismaClient จาก Prisma
const prisma = new PrismaClient(); // สร้างอินสแตนซ์ PrismaClient

// ฟังก์ชันสำหรับดึงรายชื่อผู้ใช้ทั้งหมด
exports.list = async (req, res) => {
  try {
    // ค้นหาผู้ใช้ทั้งหมดในฐานข้อมูล และเลือกเฉพาะฟิลด์ id, name, role
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
    res.send(users); // ส่งรายการผู้ใช้กลับไปยัง client
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาดใน console
    res.status(500).send("Server Error"); // ส่งข้อความแจ้งข้อผิดพลาดกลับไป
  }
};

// ฟังก์ชันสำหรับเปลี่ยนบทบาท (role) ของผู้ใช้
exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body.data; // รับ id และ role จาก body ของคำขอ

    // อัปเดตบทบาทของผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.update({
      where: { id: id }, // ระบุผู้ใช้ตาม id
      data: { role: role }, // อัปเดตข้อมูลบทบาท (role)
      select: {
        id: true,
        name: true,
        role: true, // เลือกฟิลด์ที่ต้องการส่งกลับ
      },
    });
    res.send(user); // ส่งข้อมูลผู้ใช้ที่ถูกอัปเดตกลับไป
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาดใน console
    res.status(500).send("Server Error"); // ส่งข้อความแจ้งข้อผิดพลาดกลับไป
  }
};

// ฟังก์ชันสำหรับดึงฟอร์มของผู้ใช้ตาม id
exports.getUserForms = async (req, res) => {
  try {
    const userId = req.user.id; // ดึง id ของผู้ใช้จาก req.user (ที่ได้จาก middleware ตรวจสอบสิทธิ์)

    // ค้นหาผู้ใช้และรวมข้อมูลฟอร์มที่เชื่อมต่อกับผู้ใช้นั้น
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        forms: true, // รวมข้อมูลฟอร์มของผู้ใช้
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // ถ้าหาผู้ใช้ไม่พบ ส่งข้อความแจ้งว่าไม่พบผู้ใช้
    }

    res.json(user.forms); // ส่งข้อมูลฟอร์มของผู้ใช้กลับไป
  } catch (err) {
    console.error(err); // แสดงข้อผิดพลาดใน console
    res.status(500).json({ error: "Server error" }); // ส่งข้อความแจ้งข้อผิดพลาดกลับไป
  }
};
