const {
  listByUser,
  findByIdAndUser,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../services/AppointmentsService');

async function list(req, res) {
  const appointments = await listByUser(req.user.id);
  return res.json(appointments);
}

async function findById(req, res) {
  const appointment = await findByIdAndUser(Number(req.params.id), req.user.id);
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json(appointment);
}

async function create(req, res) {
  const { dia, hora } = req.body;
  const appointment = await createAppointment({ userId: req.user.id, dia, hora });
  return res.status(201).json(appointment);
}

async function update(req, res) {
  const appointment = await updateAppointment(Number(req.params.id), req.user.id, req.body);
  if (!appointment) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json(appointment);
}

async function remove(req, res) {
  const deleted = await deleteAppointment(Number(req.params.id), req.user.id);
  if (!deleted) return res.status(404).json({ message: 'Agendamento não encontrado' });
  return res.json({ message: 'Agendamento cancelado com sucesso' });
}

module.exports = { list, findById, create, update, remove };
