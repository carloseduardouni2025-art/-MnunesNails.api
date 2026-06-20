const { Router } = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const servicesRoutes = require('./servicesRoutes');
const appointmentsRoutes = require('./appointmentsRoutes');

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/services', servicesRoutes);
router.use('/appointments', appointmentsRoutes);

module.exports = router;
