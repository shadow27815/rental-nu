const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"];
        if (!token) {
            return res.status(401).send('No token');
        }
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded.user;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send('Token Invalid');
    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        const userAdmin = await prisma.user.findFirst({
            where: {
                name: req.user.name,
            },
            select: {
                role: true,
            },
        });

        if (userAdmin?.role !== 'admin') {
            return res.status(403).send('Admin access Denied!!!');
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(403).send('Admin access Denied!!!');
    }
};
