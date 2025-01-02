const BASE_URL = 'http://localhost:5000/api';

/**
 * Check availability for a specific date
 * @param {string} date - The date to check availability for
 * @returns {Array} - List of available time slots
 */
export const checkAvailability = async (date) => {
  try {
    const response = await fetch(`${BASE_URL}/availability?date=${date}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to check availability');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking availability:', error.message);
    throw error;
  }
};

/**
 * Create a new booking
 * @param {Object} bookingData - The booking data (date, time, guests, name, contact)
 * @returns {Object} - The created booking details
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error.message);
    throw error;
  }
};

/**
 * Get booking summary by ID
 * @param {string} id - The booking ID
 * @returns {Object} - The booking details
 */
export const getBookingSummary = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/${id}/summary`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch booking summary');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching booking summary:', error.message);
    throw error;
  }
};

/**
 * Get all bookings
 * @returns {Array} - List of all bookings
 */
export const getBookings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch bookings');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw error;
  }
};

/**
 * Delete a booking by ID
 * @param {string} id - The booking ID
 * @returns {void}
 */
export const deleteBooking = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete booking');
    }
  } catch (error) {
    console.error('Error deleting booking:', error.message);
    throw error;
  }
};
