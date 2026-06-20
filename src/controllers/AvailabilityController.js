const { listSlots, updateSlot, updateSlotsByDate } = require('../services/AvailabilityService');

function groupByDate(slots) {
  const map = {};
  slots.forEach((slot) => {
    const dateKey = String(slot.date);
    if (!map[dateKey]) map[dateKey] = [];
    map[dateKey].push({ id: slot.id, time: slot.time, isAvailable: slot.available });
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, slotList]) => ({ date, slots: slotList.sort((a, b) => a.time.localeCompare(b.time)) }));
}

async function list(req, res) {
  const { date } = req.query;
  const slots = await listSlots(date || null);
  return res.json({ availability: groupByDate(slots) });
}

async function updateById(req, res) {
  const { available } = req.body;
  if (available === undefined) {
    return res.status(400).json({ message: 'available é obrigatório' });
  }
  const slot = await updateSlot(Number(req.params.id), available);
  if (!slot) return res.status(404).json({ message: 'Slot não encontrado' });
  return res.json({ slot });
}

async function updateByDate(req, res) {
  const { date } = req.params;
  const { available } = req.body;
  if (available === undefined) {
    return res.status(400).json({ message: 'available é obrigatório' });
  }
  const result = await updateSlotsByDate(date, available);
  return res.json(result);
}

module.exports = { list, updateById, updateByDate };
