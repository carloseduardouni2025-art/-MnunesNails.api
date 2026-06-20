const { Router } = require('express');
const { list, findById, create, update, remove } = require('../controllers/ServicesController');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', list);
router.get('/:id', findById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
