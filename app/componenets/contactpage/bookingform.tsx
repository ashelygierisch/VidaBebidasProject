'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';

import dayjs, { Dayjs } from 'dayjs';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  console.log('Date & Time', selectedDate, setSelectedTime);
  return (
    <div className="flex justify-center ">
      <form className=" flex flex-col lg:justify-center justify-start  gap-5 p-4 bg-gray-500 w-[400px] border-2 rounded-md border-[#FFD700]">
        <h1 className="font-bold text-2xl">Booking Form</h1>
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
        <div className="flex flex-col justify-center items-center text-black bg-white border-1 rounded-lg mb-2">
          <h1 className="text-2xl text-black m-3 ">Calendar</h1>
          <DateCalendar
            disablePast
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
          <div className="m-2">
            <TimePicker
              views={['hours', 'minutes']}
              value={selectedTime}
              format="hh:mm"
              onChange={(newTime) => setSelectedTime(newTime)}
            />
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
