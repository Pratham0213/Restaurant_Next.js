"use client";

import { useState } from "react";
import BookingForm from "./components/BookingForm";
import CalendarView from "./components/CalendarView";
import BookingSummary from "./components/BookingSummary";
import "./globals.css";

export default function Home() {
  const [bookingId, setBookingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("calendar"); // 'calendar', 'form', or 'summary'

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setView("form");
  };

  const handleBookingSuccess = (booking) => {
    setBookingId(booking.id);
    setView("summary");
  };

  const handleNewBooking = () => {
    setBookingId(null);
    setSelectedDate(null);
    setView("calendar");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Restaurant Table Booking
      </h1>

      {view === "calendar" && (
        <div className="max-w-2xl mx-auto">
          <CalendarView onDateSelect={handleDateSelect} />
        </div>
      )}

      {view === "form" && selectedDate && (
        <div className="max-w-md mx-auto">
          <BookingForm 
            initialDate={selectedDate}
            onSuccess={handleBookingSuccess}
            onCancel={() => setView("calendar")}
          />
        </div>
      )}

      {view === "summary" && bookingId && (
        <div className="max-w-md mx-auto">
          <BookingSummary bookingId={bookingId} />
          <button
            onClick={handleNewBooking}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Make Another Booking
          </button>
        </div>
      )}
    </div>
  );
}
