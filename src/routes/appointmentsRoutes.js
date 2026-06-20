const { Router } = require('express');
const { list, findById, create, update, remove } = require('../controllers/AppointmentsController');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', auth, list);
router.get('/:id', auth, findById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
