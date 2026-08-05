const express = require('express');
const router = express.Router();
const { getAllParts, getPartById, createPart, updatePart, deletePart, getAlliantFeed } = require('../controllers/partsController');
const { authenticate, optionalAuthenticate, requireAdmin } = require('../middleware/auth');

router.get('/', optionalAuthenticate, getAllParts);
router.get('/alliant-feed.csv', getAlliantFeed);
router.get('/:id', optionalAuthenticate, getPartById);
router.post('/', authenticate, requireAdmin, createPart);
router.put('/:id', authenticate, requireAdmin, updatePart);
router.delete('/:id', authenticate,requireAdmin, deletePart);

module.exports = router;