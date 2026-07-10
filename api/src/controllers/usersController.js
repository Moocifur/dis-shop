const prisma = require('../middleware/prisma');

const getMe = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            wholesaleStatus: true,
            isAdmin: true,
            createdAt: true
        }
    });
    res.json(user);
};

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            wholesaleStatus: true,
            isAdmin: true,
            createdAt: true
        }
    });
    res.json(users);
};

const approveWholesale = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
        where: { id },
        data: { wholesaleStatus: 'APPROVED' },
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            wholesaleStatus: true,
            isAdmin: true,
            createdAt: true
        }
    });
    res.json(user);
}

const makeAdmin = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
        where: { id },
        data: { isAdmin: true },
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            wholesaleStatus: true,
            isAdmin: true,
            createdAt: true
        }
    });
    res.json(user);
};

module.exports = { getMe, getAllUsers, approveWholesale, makeAdmin };