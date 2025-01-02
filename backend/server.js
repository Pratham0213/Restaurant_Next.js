const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const reservations = []; // Temporary storage for demo purposes

// Create Booking
app.post('/api/bookings', (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  // Check for existing bookings at the same time
  const existingBooking = reservations.find(
    (r) => r.date === date && r.time === time
  );

  if (existingBooking) {
    return res.status(400).json({ error: 'Time slot already booked.' });
  }

  const newBooking = { id: reservations.length + 1, date, time, guests, name, contact };
  reservations.push(newBooking);

  res.status(201).json(newBooking);
});

// Get Bookings
app.get('/api/bookings', (req, res) => {
  res.json(reservations);
});

// Delete Booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex((r) => r.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  reservations.splice(index, 1);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
