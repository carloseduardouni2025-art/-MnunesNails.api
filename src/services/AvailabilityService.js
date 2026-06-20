const { AppDataSource } = require('../config/database');

const repo = () => AppDataSource.getRepository('Availability');

async function listSlots(date) {
  if (date) {
    return repo().find({ where: { date }, order: { time: 'ASC' } });
  }
  return repo().find({ order: { date: 'ASC', time: 'ASC' } });
}

async function updateSlot(id, available) {
  const slot = await repo().findOne({ where: { id } });
  if (!slot) return null;
  slot.available = available;
  return repo().save(slot);
}

async function updateSlotsByDate(date, available) {
  const result = await repo().update({ date }, { available });
  return { updated: result.affected };
}

module.exports = { listSlots, updateSlot, updateSlotsByDate };
