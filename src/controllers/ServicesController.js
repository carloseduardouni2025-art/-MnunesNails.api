const {
  listServices,
  findServiceById,
  createService,
  updateService,
  deleteService,
} = require('../services/ServicesService');

async function list(req, res) {
  const services = await listServices();
  return res.json({ services });
}

async function findById(req, res) {
  const service = await findServiceById(Number(req.params.id));
  if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
  return res.json({ service });
}

async function create(req, res) {
  const { name, price, description, duration, isActive } = req.body;
  const service = await createService({ name, price, description, duration, isActive });
  return res.status(201).json({ service });
}

async function update(req, res) {
  const service = await updateService(Number(req.params.id), req.body);
  if (!service) return res.status(404).json({ message: 'Serviço não encontrado' });
  return res.json({ service });
}

async function remove(req, res) {
  const deleted = await deleteService(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Serviço não encontrado' });
  return res.json({ message: 'Serviço removido com sucesso' });
}

module.exports = { list, findById, create, update, remove };
