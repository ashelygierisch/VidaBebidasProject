'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { toast } from 'react-hot-toast';
import dayjs, { Dayjs } from 'dayjs';
import BookingDetails from './bookingDetails';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [bookedDates, setBookedDates] = useState<Dayjs[]>([]);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const response = await fetch(
        `/api/get-booked-dates?${new Date().getTime()}`,
        {
          headers: {
            'Cache-Control':
              'no-store, no-cache, must-revalidate, proxy-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
          cache: 'no-store',
        }
      );
      if (!response.ok) throw new Error('Failed to fetch booked dates');
      const data = await response.json();
      const formattedDates = data.map((booking: { date: string }) =>
        dayjs(booking.date)
      );
      setBookedDates(formattedDates);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  const createUser = async () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }
    if (!name || !email || !address || !phone || !service) {
      toast.error('Please fill in all the required fields');
      return;
    }

    const bookingDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const bookingTime = dayjs(selectedTime).format('hh:mm A');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: bookingDate,
          time: bookingTime,
          name,
          email,
          phone,
          address,
          message,
          service,
        }),
      });

      if (response.ok) {
        const { bookingId } = await response.json();
        sessionStorage.setItem('bookingId', bookingId);
        fetchBookedDates(); // Trigger re-fetch and re-render
        router.push(`/waiver?email=${email}&name=${name}`);
      } else {
        const data = await response.json();
        toast.error(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const isDateBooked = (date: Dayjs) => {
    return bookedDates.some((bookedDate) => bookedDate.isSame(date, 'day'));
  };

  return (
    <div className="flex justify-center py-10 bg-black min-h-screen">
      <form className="flex flex-col gap-5 p-6 bg-white w-full max-w-lg border border-gray-300 rounded-lg shadow-lg">
        {/* Form Fields */}
        <BookingDetails />
        <div className="flex flex-col justify-center items-center text-black bg-white border border-gray-300 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Calendar</h2>
          <DateCalendar
            disablePast
            shouldDisableDate={isDateBooked}
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </div>
        <div className="flex flex-col justify-center items-center text-black bg-white border border-gray-300 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Time</h2>
          <p className="text-sm text-gray-600 mb-4">
            Please choose the time you would like me to arrive at your event.
          </p>
          <TimePicker
            views={['hours', 'minutes']}
            value={selectedTime}
            format="hh:mm a"
            onChange={(newTime) => setSelectedTime(newTime)}
          />
        </div>

        <Button
          className="bg-orange-400 rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse"
          variant="shadow"
          onClick={createUser}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
