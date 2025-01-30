const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, // Store date as YYYY-MM-DD
  time: { type: String, required: true },
  notification: { type: Boolean, default: false },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
