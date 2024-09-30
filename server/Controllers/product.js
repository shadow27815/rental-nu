const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

// ฟังก์ชันสำหรับดึงข้อมูลพื้นที่ตาม id
exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await prisma.product.findUnique({
            where: { id },
        });
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server Error', error: err.message });
    }
};

// ฟังก์ชันสำหรับดึงรายการพื้นที่ทั้งหมด
exports.list = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันสำหรับดึงรายการพื้นที่ตามการจัดเรียงและจำกัดจำนวน
exports.listby = async (req, res) => {
    try {
        const { limit, sort, order } = req.body;
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
        });
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันสำหรับสร้างพื้นที่ใหม่
exports.create = async (req, res) => {
    try {
        const data = {
            ...req.body,
            price: parseInt(req.body.price),  // แปลงค่า price ให้เป็น Int
            file: req.file ? req.file.filename : 'noimage.jpg',
            status: req.body.status || 'ว่าง', // กำหนดสถานะเป็นภาษาไทย ค่าเริ่มต้นคือ "ว่าง"
            tenant: req.body.tenantId ? { connect: { id: req.body.tenantId } } : undefined // เชื่อมต่อกับ tenant โดยใช้ tenantId
        };
        const product = await prisma.product.create({
            data,
        });
        res.status(201).send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันสำหรับอัปเดตข้อมูลพื้นที่
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = {
            name: req.body.name,
            detail: req.body.detail,
            price: parseInt(req.body.price),  // แปลงค่า price ให้เป็น Int
            location: req.body.location,
            status: req.body.status,  // อัปเดตสถานะเป็นภาษาไทย
            file: req.file ? req.file.filename : undefined,
            tenant: req.body.tenantId ? { connect: { id: req.body.tenantId } } : undefined // แก้ tenantId เป็น tenant
        };

        if (req.file && req.body.fileold) {
            // ลบไฟล์เก่า
            fs.unlink(`./uploads/${req.body.fileold}`, err => {
                if (err) console.log(err);
            });
        }

        const updated = await prisma.product.update({
            where: { id },
            data: newData,
        });
        res.send(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันสำหรับลบพื้นที่
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const removed = await prisma.product.delete({
            where: { id },
        });

        if (removed?.file) {
            fs.unlink(`./uploads/${removed.file}`, err => {
                if (err) console.log(err);
            });
        }

        res.send(removed);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};
