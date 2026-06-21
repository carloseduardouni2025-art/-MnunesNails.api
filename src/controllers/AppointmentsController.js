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
  listTakenTimesByDate,
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
  try {
    const appointment = await createAppointment({ userId: req.user.id, dia, hora, service_id, status, notas });
    return res.status(201).json({ appointment });
  } catch (err) {
    if (err.status === 409) return res.status(409).json({ message: err.message });
    throw err;
  }
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

async function listTaken(req, res) {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'date é obrigatório' });
  const takenTimes = await listTakenTimesByDate(date);
  return res.json({ takenTimes });
}

module.exports = { list, findById: findByIdHandler, create, update, cancel, duplicate, remove, listTaken };
