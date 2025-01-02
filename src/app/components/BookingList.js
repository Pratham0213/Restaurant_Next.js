import { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.date} {booking.time} - {booking.name} ({booking.guests} guests)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
