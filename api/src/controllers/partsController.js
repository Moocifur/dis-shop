const prisma = require('../middleware/prisma');
const { getWholesaleInfo, computeWholesalePrice } = require('../services/wholesale');

const attachWholesalePrice = (part, canSeeWholesale, discountPercent) => {
    const wholesalePrice = canSeeWholesale ? computeWholesalePrice(part.price, discountPercent) : null;
    if (wholesalePrice === null) return part;
    return { ...part, wholesalePrice };
};

const getAllParts = async (req, res) => {
    const { canSeeWholesale, discountPercent } = await getWholesaleInfo(req.user);
    const { page, limit } = req.query;

    let parts;
    if (page && limit) {
        const take = Number(limit);
        const skip = (Number(page) - 1) * take;
        const [pageOfParts, total] = await Promise.all([
            prisma.part.findMany({ skip, take, orderBy: { partNumber: 'asc' } }),
            prisma.part.count()
        ]);
        res.set('X-Total-Count', String(total));
        parts = pageOfParts;
    } else {
        parts = await prisma.part.findMany();
    }

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
    const { partNumber, description, brand, category, price, coreCharge, quantityOnHand, active, images } = req.body;

    const part = await prisma.part.create({
        data: { partNumber, description, brand, category, price, coreCharge, quantityOnHand: Number(quantityOnHand) || 0, active, images }
    });
    res.status(201).json(part);
};

const updatePart = async (req, res) => {
    const { id } = req.params;

    const { partNumber, description, brand, category, price, coreCharge, quantityOnHand, active, images } = req.body;

    const data = { partNumber, description, brand, category, price, coreCharge, active, images };
    if (quantityOnHand !== undefined) {
        data.quantityOnHand = Number(quantityOnHand) || 0;
    }

    const part = await prisma.part.update({
        where: { id },
        data
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

const csvEscape = (value) => {
    const str = String(value ?? '');
    if (/[",\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

const getAlliantFeed = async (req, res) => {
    if (req.query.token !== process.env.ALLIANT_FEED_TOKEN) {
        return res.status(401).send('Unauthorized');
    }

    const parts = await prisma.part.findMany({ where: { active: true } });

    const rows = [
        'Location Code,Manufacturer,Part Number,On Hand',
        ...parts.map(part => [
            '',
            csvEscape(part.brand),
            csvEscape(part.partNumber),
            part.quantityOnHand
        ].join(','))
    ];

    res.set('Content-Type', 'text/csv');
    res.send(rows.join('\n'));
};

module.exports = { getAllParts, getPartById, createPart, updatePart, deletePart, getAlliantFeed };
