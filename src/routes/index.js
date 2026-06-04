const { Router } = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
