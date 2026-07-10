const express = require('express');
const router = express.Router();
const { getMe, getAllUsers, approveWholesale, makeAdmin } = require('../controllers/usersController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/me', authenticate, getMe);
router.get('/', authenticate, requireAdmin, getAllUsers);
router.put('/:id/approve-wholesale', authenticate, requireAdmin, approveWholesale);
router.put('/:id/make-admin', authenticate, requireAdmin, makeAdmin);

module.exports = router;