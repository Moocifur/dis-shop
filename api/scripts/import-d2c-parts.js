// One-off bulk import for Alliant's D2C parts list (Row Labels / Internal Number / Item Number / Item Description 2).
// Usage: node scripts/import-d2c-parts.js /path/to/file.csv
const fs = require('fs');
const prisma = require('../src/middleware/prisma');

function parseCsvLine(line) {
    const fields = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (inQuotes) {
            if (char === '"' && line[i + 1] === '"') {
                field += '"';
                i++;
            } else if (char === '"') {
                inQuotes = false;
            } else {
                field += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                fields.push(field);
                field = '';
            } else {
                field += char;
            }
        }
    }
    fields.push(field);
    return fields;
}

async function main() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('Usage: node scripts/import-d2c-parts.js /path/to/file.csv');
        process.exit(1);
    }

    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).filter(l => l.length > 0);
    const [header, ...rows] = lines;
    console.log('Header:', header);

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const line of rows) {
        const [vendorCode, internalNumber, itemNumber, description] = parseCsvLine(line);

        if (!itemNumber) {
            skipped++;
            continue;
        }

        const brand = vendorCode || 'Unknown';

        const existing = await prisma.part.findUnique({ where: { partNumber: itemNumber } });

        if (existing) {
            await prisma.part.update({
                where: { partNumber: itemNumber },
                data: { brand, description: description || existing.description }
            });
            updated++;
        } else {
            await prisma.part.create({
                data: {
                    partNumber: itemNumber,
                    description: description || itemNumber,
                    brand,
                    category: 'Uncategorized',
                    active: true
                }
            });
            created++;
        }

        if ((created + updated) % 200 === 0) {
            console.log(`Progress: ${created + updated}/${rows.length}`);
        }
    }

    console.log(`Done. Created: ${created}, Updated: ${updated}, Skipped (no item number): ${skipped}`);
    await prisma.$disconnect();
}

main();
