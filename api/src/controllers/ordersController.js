const prisma = require('../middleware/prisma');
const { Prisma } = require('@prisma/client');
const { getWholesaleInfo, computeWholesalePrice } = require('../services/wholesale');

const createOrder = async (req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Order must include at least one item' });
    }

    for (const item of items) {
        if (!item.partId || !Number.isInteger(item.quantity) || item.quantity < 1) {
            return res.status(400).json({ message: 'Each item needs a partId and a quantity of at least 1' });
        }
    }

    const partIds = items.map(item => item.partId);
    const parts = await prisma.part.findMany({ where: { id: { in: partIds } } });
    const partsById = Object.fromEntries(parts.map(p => [p.id, p]));

    for (const item of items) {
        const part = partsById[item.partId];
        if (!part) {
            return res.status(400).json({ message: `Part ${item.partId} not found` });
        }
        if (part.price === null) {
            return res.status(400).json({ message: `${part.partNumber} has no price set and cannot be ordered` });
        }
    }

    const { canSeeWholesale, discountPercent } = await getWholesaleInfo(req.user);

    let subtotal = new Prisma.Decimal(0);
    let coreChargeTotal = new Prisma.Decimal(0);
    const orderItemsData = [];

    for (const { partId, quantity } of items) {
        const part = partsById[partId];
        const qty = new Prisma.Decimal(quantity);
        const wholesalePrice = canSeeWholesale ? computeWholesalePrice(part.price, discountPercent) : null;
        const unitPrice = wholesalePrice ?? part.price;
        const coreCharge = part.coreCharge;

        subtotal = subtotal.plus(unitPrice.times(qty));
        if (coreCharge) {
            coreChargeTotal = coreChargeTotal.plus(coreCharge.times(qty));
        }

        orderItemsData.push({
            partId: part.id,
            partNumber: part.partNumber,
            description: part.description,
            unitPrice,
            coreCharge,
            quantity,
            coreStatus: coreCharge ? 'PENDING' : 'NONE'
        });
    }

    const order = await prisma.order.create({
        data: {
            userId: req.user.userId,
            // No payment processor wired in yet — orders are marked PAID immediately.
            // Once Stripe is added, this should start as PENDING_PAYMENT and only
            // flip to PAID after a successful charge is confirmed.
            status: 'PAID',
            subtotal,
            coreChargeTotal,
            total: subtotal.plus(coreChargeTotal),
            items: { create: orderItemsData }
        },
        include: { items: true }
    });

    res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
    const orders = await prisma.order.findMany({
        where: { userId: req.user.userId },
        include: { items: true },
        orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
        where: { id },
        include: { items: true }
    });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.userId === req.user.userId;
    if (!isOwner && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
};

const getAllOrders = async (req, res) => {
    const orders = await prisma.order.findMany({
        include: {
            items: true,
            user: { select: { name: true, email: true, company: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
};

const VALID_CORE_STATUSES = ['NONE', 'PENDING', 'RETURNED', 'INSPECTED', 'REFUNDED', 'REJECTED'];

const updateCoreStatus = async (req, res) => {
    const { orderId, itemId } = req.params;
    const { coreStatus } = req.body;

    if (!VALID_CORE_STATUSES.includes(coreStatus)) {
        return res.status(400).json({ message: 'Invalid core status' });
    }

    const item = await prisma.orderItem.findUnique({ where: { id: itemId } });
    if (!item || item.orderId !== orderId) {
        return res.status(404).json({ message: 'Order item not found' });
    }

    const updated = await prisma.orderItem.update({
        where: { id: itemId },
        data: { coreStatus }
    });

    res.json(updated);
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateCoreStatus };
