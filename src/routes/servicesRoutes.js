const { Router } = require('express');
const { list, findById, create, update, remove } = require('../controllers/ServicesController');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/', list);
router.get('/:id', findById);
router.post('/', auth, requireAdmin, create);
router.put('/:id', auth, requireAdmin, update);
router.delete('/:id', auth, requireAdmin, remove);

module.exports = router;
