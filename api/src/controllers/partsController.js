const prisma = require('../middleware/prisma');
const { getWholesaleInfo, computeWholesalePrice } = require('../services/wholesale');

const attachWholesalePrice = (part, canSeeWholesale, discountPercent) => {
    const wholesalePrice = canSeeWholesale ? computeWholesalePrice(part.price, discountPercent) : null;
    if (wholesalePrice === null) return part;
    return { ...part, wholesalePrice };
};

const getAllParts = async (req, res) => {
    const { canSeeWholesale, discountPercent } = await getWholesaleInfo(req.user);

    const parts = await prisma.part.findMany();
    res.json(parts.map(part => attachWholesalePrice(part, canSeeWholesale, discountPercent)));
};

const getPartById = async (req, res) => {
    const { id } = req.params;
    const part = await prisma.part.findUnique({
        where: { id }
    });
    if (!part) {
        return res.status(404).json({ message: 'Part not found' });
    }

    const { canSeeWholesale, discountPercent } = await getWholesaleInfo(req.user);

    res.json(attachWholesalePrice(part, canSeeWholesale, discountPercent));
};

const createPart = async (req, res) => {
    const { partNumber, description, brand, category, price, coreCharge, active, images } = req.body;

    const part = await prisma.part.create({
        data: { partNumber, description, brand, category, price, coreCharge, active, images }
    });
    res.status(201).json(part);
};

const updatePart = async (req, res) => {
    const { id } = req.params;

    const { partNumber, description, brand, category, price, coreCharge, active, images } = req.body;

    const part = await prisma.part.update({
        where: { id },
        data: { partNumber, description, brand, category, price, coreCharge, active, images }
    });
    res.json(part);
};

 const deletePart = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.part.delete({ where: { id } });
        res.status(204).send();
    } catch (err) {
        if (err.code === 'P2003') {
            return res.status(409).json({ message: 'Cannot delete a part that has order history. Mark it inactive instead.' });
        }
        throw err;
    }
 }

module.exports = { getAllParts, getPartById, createPart, updatePart, deletePart };
