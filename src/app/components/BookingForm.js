import { createBooking, getBookings, deleteBooking } from './api';

const BookingForm = () => {
  const handleCreateBooking = async (event) => {
    event.preventDefault();
    const bookingData = {
      date: event.target.date.value,
      time: event.target.time.value,
      guests: event.target.guests.value,
      name: event.target.name.value,
      contact: event.target.contact.value,
    };

    try {
      const newBooking = await createBooking(bookingData);
      console.log('Booking created:', newBooking);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleCreateBooking}>
      <input type="date" name="date" required />
      <input type="time" name="time" required />
      <input type="number" name="guests" min="1" required />
      <input type="text" name="name" placeholder="Name" required />
      <input type="tel" name="contact" placeholder="Contact" required />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
