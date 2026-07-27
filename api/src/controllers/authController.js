const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../middleware/prisma');

const register = async (req, res) => {
    const { email, password, name, company } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                name,
                company,
            },
        });
        res.json({ message: 'User created', userId: user.id });
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ message: 'Email already in use' });
        }
        throw err;
    }
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

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 1000
    });

    res.json({ token });
};

const logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('token', {
        path: '/',
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    });
    res.json({ message: 'Logged out' });
};

module.exports = { register, login, logout };

