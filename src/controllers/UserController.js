const { createUser, listUsers } = require('../services/UserService');

async function create(req, res) {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'phone e password são obrigatórios' });
  }

  const user = await createUser({ phone, password });
  const { password: _, ...data } = user;
  return res.status(201).json(data);
}

async function list(req, res) {
  const users = await listUsers();
  return res.json({ users });
}

module.exports = { create, list };
