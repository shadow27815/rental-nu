const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.list = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body.data;

    const user = await prisma.user.update({
      where: { id: id },
      data: { role: role },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.getUserForms = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        forms: true, 
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};