const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;

    // 1. Check if user exists
    const userExists = await prisma.user.findFirst({
      where: { name },
    });
    if (userExists) {
      return res.status(400).send("User Already Exists!!!");
    }

    // 2. Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save user
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    res.send("Register Success!!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // 1. Check user
    const user = await prisma.user.findFirst({
      where: { name },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }

      // 2. Payload
      const payload = {
        user: {
          name: user.name,
          role: user.role,
        },
      };

      // 3. Generate token
      jwt.sign(payload, "jwtsecret", { expiresIn: "10y" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      const text = `User ${name} พยายาม Login`;
      await notifyLine(tokenLine, text);
      return res.status(400).send("User not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: req.user.name,
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
