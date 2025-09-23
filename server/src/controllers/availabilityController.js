import * as db from '../models/availabilityModel.js';

async function defaultHoursGet(req, res) {
  const { day_of_week, hours } = await db.getDefaultHours(req.user.id, req.query.day);
  res.json({ day_of_week, hours });
}

async function defaultHoursPost(req, res) {
  const { day, hours } = req.body;
  const availability = await db.setDefaultHours(req.user.id, day, hours);
  res.status(201).json({ hours: availability.hours });
}

async function dateHoursGet(req, res) {
  const { hours } = await db.getDateHours(req.user.id, req.query.date);
  res.json({ hours });
}

async function dateHoursPost(req, res) {
  const { date, hours } = req.body;
  const availability = await db.setDateHours(req.user.id, date, hours);
  res.status(201).json({ hours: availability.hours });
}

export { defaultHoursGet, defaultHoursPost, dateHoursGet, dateHoursPost };