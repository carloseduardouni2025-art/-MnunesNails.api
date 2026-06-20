const jwt = require('jsonwebtoken');
const { loginUser, createUser, findUserById } = require('../services/UserService');

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

async function adminLogin(req, res) {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'phone e password são obrigatórios' });
  }

  try {
    const result = await loginUser({ phone, password });
    const payload = jwt.verify(result.token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado: usuário não é administrador' });
    }
    return res.json(result);
  } catch (err) {
    if (err.message === 'Credenciais inválidas') {
      return res.status(401).json({ message: err.message });
    }
    return res.status(403).json({ message: 'Acesso negado' });
  }
}

async function register(req, res) {
  const { name, whatsapp, password } = req.body;

  if (!whatsapp || !password) {
    return res.status(400).json({ message: 'whatsapp e password são obrigatórios' });
  }

  try {
    const user = await createUser({ name, phone: whatsapp, whatsapp, password });
    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.status(201).json({ token });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Telefone já cadastrado' });
    }
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
}

async function me(req, res) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    return res.json(user);
  } catch {
    return res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
}

async function logout(req, res) {
  return res.json({ message: 'ok' });
}

module.exports = { login, adminLogin, register, me, logout };
