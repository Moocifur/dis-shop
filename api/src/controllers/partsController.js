const prisma = require('../middleware/prisma');

const filterWholesalePrice = (part, canSeeWholesale) => {
    if (canSeeWholesale) return part;
    const { wholesalePrice, ...rest } = part;
    return rest;
};

const getAllParts = async (req, res) => {
    const requester = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select:{ wholesaleStatus: true, isAdmin: true }
    });

    const canSeeWholesale = requester?.isAdmin || requester?.wholesaleStatus === 'APPROVED';

    const parts = await prisma.part.findMany();
    res.json(parts.map(part => filterWholesalePrice(part, canSeeWholesale)));
};

const getPartById = async (req, res) => {
    const { id } = req.params;
    const part = await prisma.part.findUnique({
        where: { id }
    });
    if (!part) {
        return res.status(404).json({ message: 'Part not found' });
    }

    const requester = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { wholesaleStatus: true, isAdmin: true }
    });

    const canSeeWholesale = requester?.isAdmin || requester?.wholesaleStatus === 'APPROVED';

    res.json(filterWholesalePrice(part, canSeeWholesale));
};

const createPart = async (req, res) => {
    const part = await prisma.part.create({
        data: req.body
    });
    res.status(201).json(part);
};

const updatePart = async (req, res) => {
    const { id } = req.params;
    const part = await prisma.part.update({
        where: { id },
        data: req.body
    });
    res.json(part);
};

 const deletePart = async (req, res) => {
    const { id } = req.params;
    await prisma.part.delete({
        where: { id }
    });
    res.status(204).send();
 }

module.exports = { getAllParts, getPartById, createPart, updatePart, deletePart };