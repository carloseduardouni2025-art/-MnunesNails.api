const { Router } = require('express');
const { create, list } = require('../controllers/UserController');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

const router = Router();

router.post('/', create);
router.get('/', auth, requireAdmin, list);

module.exports = router;
