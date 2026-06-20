const { AppDataSource } = require('../config/database');
const { updatePassword } = require('./UserService');

const userRepo = () => AppDataSource.getRepository('User');
const tokenRepo = () => AppDataSource.getRepository('RecoveryToken');

function generateToken() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function requestRecovery(phone) {
  const user = await userRepo().findOne({ where: { phone } });
  if (!user) {
    const err = new Error('Telefone não encontrado');
    err.status = 404;
    throw err;
  }

  const token = generateToken();
  const expires_at = new Date(Date.now() + 10 * 60 * 1000);

  const record = tokenRepo().create({ user_id: user.id, token, expires_at, used: false });
  await tokenRepo().save(record);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[RECOVERY] Código para ${phone}: ${token}`);
  }

  return { message: 'código enviado' };
}

async function recoverPassword({ phone, token, newPassword }) {
  const user = await userRepo().findOne({ where: { phone } });
  if (!user) {
    const err = new Error('Telefone não encontrado');
    err.status = 400;
    throw err;
  }

  const record = await tokenRepo().findOne({
    where: { user_id: user.id, token, used: false },
    order: { createdAt: 'DESC' },
  });

  if (!record) {
    const err = new Error('Código inválido');
    err.status = 400;
    throw err;
  }

  if (new Date() > new Date(record.expires_at)) {
    const err = new Error('Código expirado');
    err.status = 400;
    throw err;
  }

  await updatePassword(user.id, newPassword);
  await tokenRepo().update({ id: record.id }, { used: true });

  return { message: 'senha alterada' };
}

module.exports = { requestRecovery, recoverPassword };
