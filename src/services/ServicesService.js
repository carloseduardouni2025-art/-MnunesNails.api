const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('Services');

function toDto(service) {
  if (!service) return null;
  return {
    id: service.id,
    name: service.nome,
    description: service.description,
    price: service.price ? `R$ ${Number(service.price).toFixed(2).replace('.', ',')}` : '',
    duration: service.time ? `${service.time} min` : '',
    isActive: service.isActive !== undefined ? service.isActive : true,
  };
}

async function listServices() {
  const services = await repo().find({ order: { id: 'ASC' } });
  return services.map(toDto);
}

async function findServiceById(id) {
  return toDto(await repo().findOne({ where: { id } }));
}

async function createService({ name, price, description, duration, isActive = true }) {
  const priceNum = parseFloat(String(price || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
  const timeNum = parseInt(String(duration || '0').replace(/\D/g, ''), 10) || 0;
  const service = repo().create({ nome: name, price: priceNum, description, time: timeNum, isActive });
  return toDto(await repo().save(service));
}

async function updateService(id, { name, price, description, duration, isActive }) {
  const existing = await repo().findOne({ where: { id } });
  if (!existing) return null;

  if (name !== undefined) existing.nome = name;
  if (price !== undefined) existing.price = parseFloat(String(price).replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
  if (description !== undefined) existing.description = description;
  if (duration !== undefined) existing.time = parseInt(String(duration).replace(/\D/g, ''), 10) || 0;
  if (isActive !== undefined) existing.isActive = isActive;

  return toDto(await repo().save(existing));
}

async function deleteService(id) {
  const result = await repo().delete(id);
  return result.affected > 0;
}

module.exports = { listServices, findServiceById, createService, updateService, deleteService };
