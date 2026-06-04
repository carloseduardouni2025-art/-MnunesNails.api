const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('User');

async function createUser({ phone, password }) {
  const hashed = await bcrypt.hash(password, 10);
  const user = repo().create({ phone, password: hashed });
  return repo().save(user);
}

async function listUsers() {
  return repo().find({ select: { id: true, phone: true, createdAt: true } });
}

async function loginUser({ phone, password }) {
  const user = await repo().findOne({ where: { phone } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas');
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token };
}

module.exports = { createUser, listUsers, loginUser };
