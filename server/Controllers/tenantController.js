const { PrismaClient, TenantStatus } = require('@prisma/client'); // นำเข้า PrismaClient และ TenantStatus จาก Prisma
const prisma = new PrismaClient(); // สร้างอินสแตนซ์ PrismaClient

// ฟังก์ชันสำหรับจัดรูปแบบวันที่เป็น ISO String
const formatDate = (date) => date ? new Date(date).toISOString() : undefined;

// ฟังก์ชันสำหรับสร้างออบเจกต์ข้อมูลที่จะใช้ในการอัปเดตผู้เช่า
const buildUpdateData = ({ name, email, phone, message, startDate, endDate, products, slip }) => {
    const dataToUpdate = {}; // ออบเจกต์ที่เก็บข้อมูลที่ต้องการอัปเดต
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (phone) dataToUpdate.phone = phone;
    if (message) dataToUpdate.message = message;
    if (startDate) dataToUpdate.startDate = formatDate(startDate); // จัดรูปแบบวันที่เริ่มต้น
    if (endDate) dataToUpdate.endDate = formatDate(endDate); // จัดรูปแบบวันที่สิ้นสุด
    if (products && products.length > 0) { // ตรวจสอบว่ามีรายการพื้นที่หรือไม่
        const productIds = Array.isArray(products) ? products : [products]; // แปลงเป็น array ถ้าไม่ใช่ array
        dataToUpdate.products = { set: productIds.map(id => ({ id })) }; // เชื่อมต่อพื้นที่
    }
    if (slip) dataToUpdate.slip = slip; // อัปเดต slip (ไฟล์)
    return dataToUpdate; // ส่งข้อมูลที่ต้องการอัปเดต
};

// ฟังก์ชันสำหรับสร้างข้อมูลผู้เช่าใหม่
exports.create = async (req, res) => {
    const { name, email, phone, message, startDate, endDate, products } = req.body; // ดึงข้อมูลจาก body ของคำขอ
    const slip = req.file ? req.file.filename : null; // จัดการไฟล์ slip ถ้ามีการอัปโหลด

    try {
        // ใช้ Prisma เพื่อสร้างข้อมูลผู้เช่าใหม่ในฐานข้อมูล
        const newTenant = await prisma.tenant.create({
            data: {
                name,
                email,
                phone,
                message,
                slip,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                products: { connect: (Array.isArray(products) ? products : [products]).map(id => ({ id })) }, // เชื่อมต่อกับพื้นที่
            },
        });
        res.status(201).json({ message: 'Tenant information saved successfully', data: newTenant }); // ส่งข้อมูลที่สร้างสำเร็จกลับไป
    } catch (error) {
        console.error('Error saving tenant:', error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: 'Failed to save tenant information' }); // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชันสำหรับดึงรายการผู้เช่าทั้งหมด
exports.list = async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany({ include: { products: true } }); // ดึงข้อมูลผู้เช่าทั้งหมดรวมถึงพื้นที่ที่เชื่อมต่อ
        res.json(tenants); // ส่งข้อมูลผู้เช่ากลับไป
    } catch (error) {
        console.error('Error fetching tenants:', error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: 'Failed to fetch tenant information' }); // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้เช่าตาม ID
exports.read = async (req, res) => {
    try {
        const tenant = await prisma.tenant.findUnique({
            where: { id: req.params.id }, // ดึงข้อมูลผู้เช่าตาม ID ที่ส่งมา
            include: { products: true }, // รวมข้อมูลพื้นที่ที่เชื่อมต่อด้วย
        });
        if (!tenant) {
            return res.status(404).json({ error: 'Tenant not found' }); // ถ้าผู้เช่าไม่พบ ส่งข้อความไม่พบข้อมูล
        }
        res.json(tenant); // ส่งข้อมูลผู้เช่ากลับไป
    } catch (error) {
        console.error('Error fetching tenant:', error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: 'Failed to fetch tenant information' }); // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชันสำหรับอัปเดตข้อมูลผู้เช่า
exports.update = async (req, res) => {
    try {
        const { id } = req.params; // ดึง ID ของผู้เช่าจากพารามิเตอร์
        const slip = req.file ? req.file.filename : undefined;  // ถ้ามีไฟล์ใหม่ใช้ไฟล์นั้น ถ้าไม่มีคงค่าเดิม

        // ใช้ Prisma เพื่ออัปเดตข้อมูลผู้เช่าในฐานข้อมูล
        const updatedTenant = await prisma.tenant.update({
            where: { id }, // ระบุผู้เช่าที่จะอัปเดตตาม ID
            data: buildUpdateData({ ...req.body, slip }), // สร้างข้อมูลที่จะอัปเดตโดยใช้ buildUpdateData
        });

        res.json(updatedTenant); // ส่งข้อมูลที่อัปเดตแล้วกลับไป
    } catch (error) {
        console.error('Error updating tenant:', error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: 'Failed to update tenant information' }); // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชันสำหรับลบผู้เช่าตาม ID
exports.remove = async (req, res) => {
    try {
        const tenantId = req.params.id; // ดึง ID ของผู้เช่าจากพารามิเตอร์
        await prisma.tenant.delete({ where: { id: tenantId } }); // ใช้ Prisma เพื่อลบข้อมูลผู้เช่าในฐานข้อมูล
        res.json({ message: 'Tenant information deleted successfully' }); // ส่งข้อความแจ้งว่าลบสำเร็จ
    } catch (error) {
        console.error("Error occurred while deleting tenant:", error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: 'Failed to delete tenant information' }); // ส่งข้อผิดพลาดกลับไป
    }
};

// ฟังก์ชันสำหรับอัปเดตสถานะของผู้เช่า
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params; // ดึง ID ของผู้เช่าจากพารามิเตอร์
        const { status } = req.body; // รับสถานะใหม่จาก body ของคำขอ

        // ตรวจสอบว่าสถานะที่ได้รับเป็นค่าที่ถูกต้องหรือไม่
        if (!Object.values(TenantStatus).includes(status)) {
            return res.status(400).json({ error: "Invalid status value" }); // ถ้าสถานะไม่ถูกต้อง ส่งข้อความแจ้งข้อผิดพลาด
        }

        // ใช้ Prisma เพื่ออัปเดตสถานะผู้เช่าในฐานข้อมูล
        const updatedTenant = await prisma.tenant.update({
            where: { id }, // ระบุผู้เช่าที่จะอัปเดตตาม ID
            data: { status }, // อัปเดตสถานะ
        });

        res.json(updatedTenant); // ส่งข้อมูลที่อัปเดตแล้วกลับไป
    } catch (error) {
        console.error("Error updating tenant status:", error.message); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ error: "Failed to update tenant status" }); // ส่งข้อผิดพลาดกลับไป
    }
};
