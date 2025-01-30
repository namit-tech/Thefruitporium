const express = require('express');
const Event = require('../modals/calendar-modal'); // Adjust the path to your model
const router = express.Router();

router.get('/events/:date', async (req, res) => {
  const { date } = req.params; // Date in YYYY-MM-DD format
  try {
    const events = await Event.find({ date }); // Fetch events matching the date
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Route to save an event
router.post('/events', async (req, res) => {
  const { title, description, date, time, notification } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      notification,
    });

    await newEvent.save(); // Save the event to the database
    res.status(201).json(newEvent); // Return the saved event
  } catch (error) {
    res.status(500).json({ message: 'Error saving event' });
  }
});
module.exports = router;
