const { Router } = require('express');
const { create, list } = require('../controllers/UserController');

const router = Router();

router.post('/', create);
router.get('/', list);

module.exports = router;
