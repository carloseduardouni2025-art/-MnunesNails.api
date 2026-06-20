const {
  listAll,
  listByUser,
  findById,
  findByIdAndUser,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  duplicateAppointment,
  deleteAppointment,
} = require('../services/AppointmentsService');

async function list(req, res) {
  const appointments = req.user.role === 'admin'
    ? await listAll()
    : await listByUser(req.user.id);
  return res.json({ appointments });
}

async function findByIdHandler(req, res) {
  const id = Number(req.params.id);
  const appointment = req.user.role === 'admin'
    ? await findById(id)
    : await findByIdAndUser(id, req.user.id);
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json({ appointment });
}

async function create(req, res) {
  const { dia, hora, service_id, status, notas } = req.body;
  const appointment = await createAppointment({ userId: req.user.id, dia, hora, service_id, status, notas });
  return res.status(201).json({ appointment });
}

async function update(req, res) {
  const appointment = await updateAppointment(Number(req.params.id), req.user.id, req.body);
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json({ appointment });
}

async function cancel(req, res) {
  const appointment = await cancelAppointment(Number(req.params.id));
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json({ message: 'cancelado', appointment });
}

async function duplicate(req, res) {
  const appointment = await duplicateAppointment(Number(req.params.id));
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.status(201).json({ appointment });
}

async function remove(req, res) {
  const deleted = await deleteAppointment(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json({ message: 'Agendamento removido com sucesso' });
}

module.exports = { list, findById: findByIdHandler, create, update, cancel, duplicate, remove };
