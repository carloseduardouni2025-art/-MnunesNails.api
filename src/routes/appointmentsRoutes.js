const { Router } = require('express');
const { list, findById, create, update, cancel, duplicate, remove, listTaken } = require('../controllers/AppointmentsController');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.get('/taken', listTaken);
router.get('/', auth, list);
router.get('/:id', auth, findById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.post('/:id/cancel', auth, cancel);
router.post('/:id/duplicate', auth, duplicate);
router.delete('/:id', auth, requireAdmin, remove);

module.exports = router;
