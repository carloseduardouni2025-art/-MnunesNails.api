const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('Appointments');

async function listByUser(userId) {
  return repo().find({ where: { user_id: userId } });
}

async function findByIdAndUser(id, userId) {
  return repo().findOne({ where: { id, user_id: userId } });
}

async function createAppointment({ userId, dia, hora }) {
  const appointment = repo().create({ user_id: userId, dia, hora });
  return repo().save(appointment);
}

async function updateAppointment(id, userId, data) {
  const existing = await repo().findOne({ where: { id, user_id: userId } });
  if (!existing) return null;
  const updated = repo().merge(existing, data);
  return repo().save(updated);
}

async function deleteAppointment(id, userId) {
  const result = await repo().delete({ id, user_id: userId });
  return result.affected > 0;
}

module.exports = { listByUser, findByIdAndUser, createAppointment, updateAppointment, deleteAppointment };
