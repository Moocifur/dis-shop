const prisma = require('../middleware/prisma');
const { Prisma } = require('@prisma/client');

const getWholesaleInfo = async (user) => {
    if (!user) return { canSeeWholesale: false, discountPercent: 0 };

    const requester = await prisma.user.findUnique({
        where: { id: user.userId },
        select: { isAdmin: true, wholesaleStatus: true, wholesaleDiscountPercent: true }
    });

    const canSeeWholesale = requester?.isAdmin || requester?.wholesaleStatus === 'APPROVED';
    return { canSeeWholesale, discountPercent: requester?.wholesaleDiscountPercent ?? 0 };
};

const computeWholesalePrice = (price, discountPercent) => {
    if (price === null || discountPercent <= 0) return null;
    const multiplier = new Prisma.Decimal(100 - discountPercent).dividedBy(100);
    return price.times(multiplier).toDecimalPlaces(2);
};

module.exports = { getWholesaleInfo, computeWholesalePrice };
