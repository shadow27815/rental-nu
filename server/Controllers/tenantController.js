const { PrismaClient, TenantStatus } = require('@prisma/client');
const prisma = new PrismaClient();

const formatDate = (date) => date ? new Date(date).toISOString() : undefined;

const buildUpdateData = ({ name, email, phone, message, startDate, endDate, products, slip }) => {
    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (phone) dataToUpdate.phone = phone;
    if (message) dataToUpdate.message = message;
    if (startDate) dataToUpdate.startDate = formatDate(startDate);
    if (endDate) dataToUpdate.endDate = formatDate(endDate);
    if (products && products.length > 0) {
        const productIds = Array.isArray(products) ? products : [products];
        dataToUpdate.products = { set: productIds.map(id => ({ id })) };
    }
    if (slip) dataToUpdate.slip = slip;
    return dataToUpdate;
};

// Create a new tenant
exports.create = async (req, res) => {
    const { name, email, phone, message, startDate, endDate, products } = req.body;
    const slip = req.file ? req.file.filename : null;

    try {
        const newTenant = await prisma.tenant.create({
            data: {
                name,
                email,
                phone,
                message,
                slip,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                products: { connect: (Array.isArray(products) ? products : [products]).map(id => ({ id })) },
            },
        });
        res.status(201).json({ message: 'Tenant information saved successfully', data: newTenant });
    } catch (error) {
        console.error('Error saving tenant:', error.message);
        res.status(500).json({ error: 'Failed to save tenant information' });
    }
};

// List all tenants
exports.list = async (req, res) => {
    try {
        const tenants = await prisma.tenant.findMany({ include: { products: true } });
        res.json(tenants);
    } catch (error) {
        console.error('Error fetching tenants:', error.message);
        res.status(500).json({ error: 'Failed to fetch tenant information' });
    }
};

// Get a tenant by ID
exports.read = async (req, res) => {
    try {
        const tenant = await prisma.tenant.findUnique({
            where: { id: req.params.id },
            include: { products: true },
        });
        if (!tenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }
        res.json(tenant);
    } catch (error) {
        console.error('Error fetching tenant:', error.message);
        res.status(500).json({ error: 'Failed to fetch tenant information' });
    }
};

// Update tenant information
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const slip = req.file ? req.file.filename : undefined;  // ใช้ undefined แทน null เพื่อคงค่าเดิมถ้าไม่มีไฟล์ใหม่

        const updatedTenant = await prisma.tenant.update({
            where: { id },
            data: buildUpdateData({ ...req.body, slip }),
        });

        res.json(updatedTenant);
    } catch (error) {
        console.error('Error updating tenant:', error.message);
        res.status(500).json({ error: 'Failed to update tenant information' });
    }
};

// Delete a tenant
exports.remove = async (req, res) => {
    try {
        const tenantId = req.params.id;
        await prisma.tenant.delete({ where: { id: tenantId } });
        res.json({ message: 'Tenant information deleted successfully' });
    } catch (error) {
        console.error("Error occurred while deleting tenant:", error.message);
        res.status(500).json({ error: 'Failed to delete tenant information' });
    }
};

// Update tenant status
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // ตรวจสอบสถานะที่ได้รับว่าถูกต้องหรือไม่
        if (!Object.values(TenantStatus).includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const updatedTenant = await prisma.tenant.update({
            where: { id },
            data: { status },
        });

        res.json(updatedTenant);
    } catch (error) {
        console.error("Error updating tenant status:", error.message);
        res.status(500).json({ error: "Failed to update tenant status" });
    }
};
