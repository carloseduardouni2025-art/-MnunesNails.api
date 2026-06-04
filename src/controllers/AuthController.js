const { loginUser } = require('../services/UserService');

async function login(req, res) {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'phone e password são obrigatórios' });
  }

  try {
    const result = await loginUser({ phone, password });
    return res.json(result);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

module.exports = { login };
