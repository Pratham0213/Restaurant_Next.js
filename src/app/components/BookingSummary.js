import { useEffect, useState } from 'react';
import { getBookingSummary } from './api';
import './BookingSummary.css';

const BookingSummary = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBookingSummary(bookingId);
        setBooking(bookingData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (loading) {
    return <div className="loading">Loading booking details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!booking) {
    return <div className="not-found">Booking not found</div>;
  }

  return (
    <div className="booking-summary">
      <h2>Booking Confirmation</h2>
      <div className="summary-details">
        <div className="detail-item">
          <span className="label">Date:</span>
          <span className="value">{new Date(booking.date).toLocaleDateString()}</span>
        </div>
        <div className="detail-item">
          <span className="label">Time:</span>
          <span className="value">{booking.time}</span>
        </div>
        <div className="detail-item">
          <span className="label">Guests:</span>
          <span className="value">{booking.guests}</span>
        </div>
        <div className="detail-item">
          <span className="label">Name:</span>
          <span className="value">{booking.name}</span>
        </div>
        <div className="detail-item">
          <span className="label">Contact:</span>
          <span className="value">{booking.contact}</span>
        </div>
      </div>
      <div className="confirmation-message">
        Your reservation has been confirmed. We look forward to seeing you!
      </div>
    </div>
  );
};

export default BookingSummary;
