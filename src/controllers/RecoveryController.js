const { requestRecovery, recoverPassword } = require('../services/RecoveryService');

async function requestRecoveryHandler(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'phone é obrigatório' });
  }

  try {
    const result = await requestRecovery(phone);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function recoverPasswordHandler(req, res) {
  const { phone, token, newPassword } = req.body;

  if (!phone || !token || !newPassword) {
    return res.status(400).json({ message: 'phone, token e newPassword são obrigatórios' });
  }

  try {
    const result = await recoverPassword({ phone, token, newPassword });
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { requestRecoveryHandler, recoverPasswordHandler };
