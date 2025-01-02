import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { checkAvailability } from './api';
import './CalendarView.css';

// Utility function for consistent date formatting
const formatDate = (date) => format(date, 'MMMM d, yyyy');

const CalendarView = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch availability data when selected date changes
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const { availableTimes } = await checkAvailability(dateStr);
        setAvailableDates(prev => ({
          ...prev,
          [dateStr]: availableTimes.length > 0
        }));
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      if (availableDates[dateStr] === false) {
        return 'unavailable-date';
      }
      if (availableDates[dateStr] === true) {
        return 'available-date';
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      // Disable past dates
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    }
    return false;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        minDetail="month"
        next2Label={null}
        prev2Label={null}
        formatMonthYear={(locale, date) => format(date, 'MMMM yyyy')}
        formatDay={(locale, date) => format(date, 'd')}
        formatShortWeekday={(locale, date) => format(date, 'EEE')}
        tileAriaLabel={({ date }) => formatDate(date)}
      />
      {loading && <div className="loading-overlay">Checking availability...</div>}
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="available"></span> Available
        </div>
        <div className="legend-item">
          <span className="unavailable"></span> Unavailable
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
