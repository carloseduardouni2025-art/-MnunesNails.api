require('reflect-metadata');
require('dotenv').config();
const { AppDataSource } = require('../config/database');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  await AppDataSource.initialize();

  const phone = process.env.ADMIN_PHONE;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';

  if (!phone || !password) {
    console.error('Defina ADMIN_PHONE e ADMIN_PASSWORD no .env');
    process.exit(1);
  }

  const repo = AppDataSource.getRepository('User');
  const existing = await repo.findOne({ where: { phone } });

  if (existing) {
    await repo.update({ phone }, { role: 'admin', name });
    console.log(`Admin atualizado: ${phone}`);
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await repo.save(repo.create({ name, phone, whatsapp: phone, password: hashed, role: 'admin' }));
    console.log(`Admin criado: ${phone}`);
  }

  await AppDataSource.destroy();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
