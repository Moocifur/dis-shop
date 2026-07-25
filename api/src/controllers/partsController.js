const prisma = require('../middleware/prisma');

const filterWholesalePrice = (part, canSeeWholesale) => {
    if (canSeeWholesale) return part;
    const { wholesalePrice, ...rest } = part;
    return rest;
};

const getCanSeeWholesale = async (user) => {
    if (!user) return false;

    const requester = await prisma.user.findUnique({
        where: { id: user.userId },
        select: { wholesaleStatus: true, isAdmin: true }
    });

    return requester?.isAdmin || requester?.wholesaleStatus === 'APPROVED';
};

const getAllParts = async (req, res) => {
    const canSeeWholesale = await getCanSeeWholesale(req.user);

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

    const canSeeWholesale = await getCanSeeWholesale(req.user);

    res.json(filterWholesalePrice(part, canSeeWholesale));
};

const createPart = async (req, res) => {
    const { partNumber, description, brand, category, price, coreCharge, wholesalePrice } = req.body;

    const part = await prisma.part.create({
        data: { partNumber, description, brand, category, price, coreCharge, wholesalePrice }
    });
    res.status(201).json(part);
};

const updatePart = async (req, res) => {
    const { id } = req.params;
    
    const { partNumber, description, brand, category, price, coreCharge, wholesalePrice } = req.body;

    const part = await prisma.part.update({
        where: { id },
        data: { partNumber, description, brand, category, price, coreCharge, wholesalePrice }
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