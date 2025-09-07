async function defaultHoursGet(req, res) {
  res.json({ hours: 5 });
}

async function defaultHoursPost(req, res) {
  res.json({ hours: 5 });
}

async function dateHoursGet(req, res) {
  res.json({ hours: 5 });
}

async function dateHoursPost(req, res) {
  res.json({ hours: 5 });
}

export { defaultHoursGet, defaultHoursPost, dateHoursGet, dateHoursPost };