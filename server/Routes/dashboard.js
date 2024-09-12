const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ดึงข้อมูลสรุปทั้งหมด
router.get('/summary', async (req, res) => {
    try {
        const totalProducts = await prisma.product.count();
        const totalTenants = await prisma.tenant.count();
        const totalUsers = await prisma.user.count();

        const summary = {
            totalProducts,
            totalTenants,
            totalUsers,
        };

        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving summary' });
    }
});

module.exports = router;
