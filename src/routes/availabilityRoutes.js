const { Router } = require('express');
const { list, updateById, updateByDate } = require('../controllers/AvailabilityController');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/', list);
router.put('/day/:date', auth, requireAdmin, updateByDate);
router.put('/:id', auth, requireAdmin, updateById);

module.exports = router;
