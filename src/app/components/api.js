// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/api/bookings';

/**
 * Create a new booking.
 * @param {Object} bookingData - The booking data (date, time, guests, name, contact).
 * @returns {Object} - The created booking details.
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create booking');
    }

    return await response.json(); // Return the newly created booking
  } catch (error) {
    console.error('Error creating booking:', error.message);
    throw error;
  }
};

/**
 * Get all bookings.
 * @returns {Array} - A list of all bookings.
 */
export const getBookings = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch bookings');
    }

    return await response.json(); // Return the list of bookings
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw error;
  }
};

/**
 * Delete a booking by ID.
 * @param {number} id - The ID of the booking to delete.
 * @returns {void}
 */
export const deleteBooking = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete booking');
    }

    console.log(`Booking with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting booking:', error.message);
    throw error;
  }
};
