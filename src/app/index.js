import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import CalendarView from '../components/CalendarView';

const Home = () => {
  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <div>
      <h1>Restaurant Booking System</h1>
      <CalendarView onDateSelect={handleDateSelect} />
      <BookingForm />
      <BookingList />
    </div>
  );
};

export default Home;
