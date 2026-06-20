const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('User');

async function createUser({ name, phone, whatsapp, password, role = 'client' }) {
  const hashed = await bcrypt.hash(password, 10);
  const user = repo().create({ name, phone, whatsapp, password: hashed, role });
  return repo().save(user);
}

async function listUsers() {
  return repo().find({ select: { id: true, phone: true, name: true, role: true, createdAt: true } });
}

async function findUserById(id) {
  return repo().findOne({ where: { id }, select: { id: true, name: true, phone: true, role: true } });
}

async function loginUser({ phone, password }) {
  const user = await repo().findOne({ where: { phone } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token };
}

async function updatePassword(userId, newPassword) {
  const hashed = await bcrypt.hash(newPassword, 10);
  await repo().update({ id: userId }, { password: hashed });
}

module.exports = { createUser, listUsers, findUserById, loginUser, updatePassword };
