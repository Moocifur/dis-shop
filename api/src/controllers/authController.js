const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../middleware/prisma');

const register = async (req, res) => {
    const { email, password, name, company } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            name,
            company,
        },
    });

    res.json({ message: 'User created', userId: user.id });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin, wholesaleStatus: user.wholesaleStatus },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({ token });
};

module.exports = { register, login };

