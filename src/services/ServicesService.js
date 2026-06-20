const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('Services');

async function listServices() {
  return repo().find();
}

async function findServiceById(id) {
  return repo().findOne({ where: { id } });
}

async function createService({ nome, price, description, time }) {
  const service = repo().create({ nome, price, description, time });
  return repo().save(service);
}

async function updateService(id, data) {
  const existing = await repo().findOne({ where: { id } });
  if (!existing) return null;
  const updated = repo().merge(existing, data);
  return repo().save(updated);
}

async function deleteService(id) {
  const result = await repo().delete(id);
  return result.affected > 0;
}

module.exports = { listServices, findServiceById, createService, updateService, deleteService };
