const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('Appointments');
const RELATIONS = { user: true, service: true };

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function toDto(a) {
  if (!a) return null;
  return {
    id: a.id,
    name: a.user?.name || '',
    phone: a.user?.phone || '',
    service: a.service?.nome || '',
    service_id: a.service_id,
    date: a.dia || '',
    time: a.hora || '',
    status: capitalize(a.status || 'pendente'),
    notes: a.notas || '',
    user_id: a.user_id,
  };
}

async function listAll() {
  const rows = await repo().find({ relations: RELATIONS, order: { createdAt: 'DESC' } });
  return rows.map(toDto);
}

async function listByUser(userId) {
  const rows = await repo().find({ where: { user_id: userId }, relations: RELATIONS, order: { createdAt: 'DESC' } });
  return rows.map(toDto);
}

async function findById(id) {
  return toDto(await repo().findOne({ where: { id }, relations: RELATIONS }));
}

async function findByIdAndUser(id, userId) {
  return toDto(await repo().findOne({ where: { id, user_id: userId }, relations: RELATIONS }));
}

async function createAppointment({ userId, dia, hora, service_id, status, notas }) {
  const conflict = await repo().findOne({
    where: { dia, hora },
    select: { id: true, status: true },
  });
  if (conflict && conflict.status !== 'cancelado') {
    const err = new Error('Horário já está agendado');
    err.status = 409;
    throw err;
  }

  const appointment = repo().create({ user_id: userId, dia, hora, service_id, status, notas });
  const saved = await repo().save(appointment);
  return toDto(await repo().findOne({ where: { id: saved.id }, relations: RELATIONS }));
}

async function updateAppointment(id, userId, { date, time, status, notes, service_id, dia, hora, notas }) {
  const existing = await repo().findOne({ where: { id, user_id: userId } });
  if (!existing) return null;

  if (date !== undefined) existing.dia = date;
  if (dia !== undefined) existing.dia = dia;
  if (time !== undefined) existing.hora = time;
  if (hora !== undefined) existing.hora = hora;
  if (status !== undefined) existing.status = status;
  if (notes !== undefined) existing.notas = notes;
  if (notas !== undefined) existing.notas = notas;
  if (service_id !== undefined) existing.service_id = service_id;

  const saved = await repo().save(existing);
  return toDto(await repo().findOne({ where: { id: saved.id }, relations: RELATIONS }));
}

async function cancelAppointment(id) {
  const existing = await repo().findOne({ where: { id } });
  if (!existing) return null;
  existing.status = 'cancelado';
  const saved = await repo().save(existing);
  return toDto(await repo().findOne({ where: { id: saved.id }, relations: RELATIONS }));
}

async function duplicateAppointment(id) {
  const existing = await repo().findOne({ where: { id } });
  if (!existing) return null;
  const { id: _id, createdAt: _c, updatedAt: _u, ...data } = existing;
  const copy = repo().create({ ...data, status: 'pendente' });
  const saved = await repo().save(copy);
  return toDto(await repo().findOne({ where: { id: saved.id }, relations: RELATIONS }));
}

async function deleteAppointment(id) {
  const result = await repo().delete({ id });
  return result.affected > 0;
}

async function listTakenTimesByDate(dia) {
  const rows = await repo().find({ where: { dia }, select: { hora: true, status: true } });
  return rows
    .filter((r) => r.status !== 'cancelado')
    .map((r) => r.hora)
    .filter(Boolean);
}

module.exports = {
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
};
