'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { toast } from 'react-hot-toast';
import dayjs, { Dayjs } from 'dayjs';
import BookedDates from './bookedDates';
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

  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const response = await fetch('/api/get-booked-dates');
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
    if (!name) {
      toast.error('Please enter your first name');
      return;
    }

    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!address) {
      toast.error('Please enter your address');
      return;
    }
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }

    if (!service) {
      toast.error('Please choose a Service');
    }

    const bookingDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const bookingTime = dayjs(selectedTime).format('hh:mm A');

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

    const data = await response.json();

    if (response.ok) {
      router.push(`/waiver?email=${email}&name=${name}`);
    } else {
      toast.error(data.error || 'An error occurred. Please try again.');
    }
  };

  const isDateBooked = (date: Dayjs) => {
    return bookedDates.some((bookedDate) => bookedDate.isSame(date, 'day'));
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-center ">
      <form className=" flex flex-col lg:justify-center justify-start  gap-5 p-4 bg-gray-400 w-[400px] border-2 rounded-md border-white">
        <h1 className="font-bold text-2xl text-center text-black">
          VidaBebidasProject Booking Form
        </h1>
        <p className="text-sm text-[#FFD700]">
          Please note the following details before Booking:
        </p>
        <BookingDetails />
        <div className="flex  flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2 text-sm ">
            Name
            <input
              type="text"
              className="grow"
              placeholder="Alvin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <label className="input input-bordered flex items-center gap-2 w-auto text-sm">
          Email
          <input
            type="text"
            className="grow"
            placeholder="daisy@site.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input h-auto input-bordered flex flex-col items-start gap-2 lg:w-auto text-sm pt-3">
          Choice of Service
          <ul className="w-full m-2">
            <li className="flex items-center gap-2 p-2">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                id="SilverPackage"
                value="SilverPackage"
                checked={service === 'SilverPackage'}
                onChange={(e) => setService(e.target.value)}
              />
              <label htmlFor="SilverPackage" className="text-sm">
                SilverPackage ($150)
              </label>
            </li>
            <li className="flex items-center gap-2 p-2">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                value="ReposadoPackage"
                id="ReposadoPackage"
                checked={service === 'ReposadoPackage'}
                onChange={(e) => setService(e.target.value)}
              />
              <label htmlFor="ReposadoPackage" className="text-sm">
                ReposadoPackage ($200)
              </label>
            </li>
            <li className="flex items-center gap-2 p-2">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                value="AñejoPackage"
                id="AñejoPackage"
                checked={service === 'AñejoPackage'}
                onChange={(e) => setService(e.target.value)}
              />
              <label htmlFor="AñejoPackage" className="text-sm">
                AñejoPackage ($250)
              </label>
            </li>
          </ul>
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto text-sm">
          Address of Event
          <input
            type="text"
            className="grow"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="1234 Mockingbird Lane, Dallas, TX 75209"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto text-sm">
          Phone Number
          <input
            type="text"
            className="grow"
            placeholder="469-768-6711"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto  text-sm h-auto">
          Questions|Comments
          <textarea
            className="grow resize-none overflow-auto m-2 rounded-lg"
            maxLength={200}
            placeholder="Do you go and get the liquor..?"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="flex flex-col justify-center items-center text-red-700 bg-white border border-red-300 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Unavailable Dates</h2>
          <BookedDates />
        </div>

        <div className="flex flex-col justify-center items-center text-black bg-white border-1 rounded-lg ">
          <h2 className="text-2xl text-black m-3 ">Calendar</h2>
          <DateCalendar
            disablePast
            shouldDisableDate={isDateBooked}
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </div>
        <div className="flex flex-col justify-center items-center text-black bg-white border-1 rounded-lg ">
          <div className="m-2 ">
            <h2 className="text-2xl text-black text-center">Time</h2>
            <p className="pb-3">
              Please choose the time you would like me to arrive at your event.
            </p>
            <TimePicker
              views={['hours', 'minutes']}
              value={selectedTime}
              format="hh:mm a"
              onChange={(newTime) => setSelectedTime(newTime)}
            />
          </div>
        </div>
        <Button
          className=" border rounded-sm border-white text-white hover:border-[#DC143C] hover:animate-pulse"
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
