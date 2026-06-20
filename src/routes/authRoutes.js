const { Router } = require('express');
const { login, adminLogin, register, me, logout } = require('../controllers/AuthController');
const { requestRecoveryHandler, recoverPasswordHandler } = require('../controllers/RecoveryController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/register', register);
router.get('/me', auth, me);
router.post('/logout', logout);
router.post('/request-recovery', requestRecoveryHandler);
router.post('/recover-password', recoverPasswordHandler);

module.exports = router;
