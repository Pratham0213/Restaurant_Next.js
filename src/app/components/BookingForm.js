import { useState } from 'react';
import { createBooking, checkAvailability } from './api';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    contact: ''
  });
  const [errors, setErrors] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setFormData({ ...formData, date });
    
    if (date) {
      try {
        const { availableTimes } = await checkAvailability(date);
        setAvailableTimes(availableTimes);
      } catch (error) {
        console.error('Error fetching availability:', error);
        setAvailableTimes([]);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = 'Number of guests must be between 1 and 20';
    }
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.contact) newErrors.contact = 'Contact information is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const booking = await createBooking(formData);
      console.log('Booking created:', booking);
      // Reset form after successful booking
      setFormData({
        date: '',
        time: '',
        guests: 1,
        name: '',
        contact: ''
      });
      setAvailableTimes([]);
      alert('Booking successful!');
    } catch (error) {
      console.error('Booking error:', error);
      alert(`Booking failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={formData.date}
          onChange={handleDateChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label>Time:</label>
        <select
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
          disabled={!formData.date}
        >
          <option value="">Select time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {errors.time && <span className="error">{errors.time}</span>}
      </div>

      <div className="form-group">
        <label>Number of Guests:</label>
        <input
          type="number"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          min="1"
          max="20"
          required
        />
        {errors.guests && <span className="error">{errors.guests}</span>}
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Contact:</label>
        <input
          type="tel"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
        {errors.contact && <span className="error">{errors.contact}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Book Now'}
      </button>
      </form>
    </div>
  );
};

export default BookingForm;
