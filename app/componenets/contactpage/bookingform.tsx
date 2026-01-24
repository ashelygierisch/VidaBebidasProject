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

import SourceList from './sourcelist';
import BookingCalender from './bookingCalendar';

import BarOptions from './baroptions'
import VenueType from './venuetype';
import { setDate } from 'date-fns';
const BookingForm = () => {
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  // const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  // const [bookedDates, setBookedDates] = useState<Dayjs[]>([]);
  
  const [clientEmail, setclientEmail] = useState('');
  const [clientName, setclientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [venueType,setvenueType]=useState('')
  const [venueName,setVenueName]=useState('');
  const [city, setCity]=useState('')
  const [address,setAddress]=useState('')
  const [guestCount,setGuestCount]=useState('')
  const [barType, setbarType] = useState('');

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime]=useState('00:00:00');
  const [endTime, setEndTime]=useState('00:00:00')

  const [message, setMessage] = useState('');

  const [barOption, setBarOption]=useState('')
  const [source,setSource]=useState('')

  const [mounted, setMounted] = useState(false);



  const router = useRouter();



  const createUser = async () => {
    // if (!selectedDate) {
    //   toast.error('Please select a date');
    //   return;
    // }
    if (!clientName) {
      toast.error('Please enter your first name');
      return;
    }

    if (!clientEmail) {
      toast.error('Please enter your email');
      return;
    }
    if (!clientPhone) {
      toast.error('Please enter your phone number');
      return;
    }

    if (!venueType) {
      toast.error('Please enter a name for the event');
      return;
    }

   
    if (!address) {
      toast.error('Please enter your address');
      return;
    }

    if(!city){
      toast.error('Please enter a city')
    }

    if (!barType) {
      toast.error('Please choose a Service');
    }

    // Combine date and time into a single ISO 8601 datetime string
    // Format: "YYYY-MM-DDTHH:mm:ss"
    // const combinedDateTime = dayjs(selectedDate)
    //   .hour(dayjs(selectedTime).hour())
    //   .minute(dayjs(selectedTime).minute())
    //   .second(0)
    //   .format('YYYY-MM-DDTHH:mm:ss');

const ClientBooking={
  clientName,
  clientEmail,
  clientPhone,
  venueType,
  date,
  startTime,
  endTime,
  venueName,
  city,
  address,
  guestCount,
  message,
  source,
  barType
}
    sessionStorage.setItem('clientbookinginfo', JSON.stringify(ClientBooking))
     

    console.log("Client & Booking Info stored", ClientBooking)
    router.push(`/waiver?email=${clientEmail}&name=${clientName}`);


  };

  return (
    <div className="flex justify-center py-10 bg-black min-h-screen">
      <form className="flex flex-col gap-5 p-6 bg-white w-full max-w-lg border border-gray-300 rounded-lg shadow-lg m-2">
        <h1 className="font-bold text-3xl text-center text-gray-800">
          VidaBebidasProject Booking Form
        </h1>
        {/* <p className="text-sm text-yellow-600">
          Please note the following details before Booking:
        </p>
        <BookingDetails /> */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Name
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="Alvin"
              value={clientName}
              onChange={(e) => setclientName(e.target.value)}
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Email
          <input
            type="email"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-white text-base"
            placeholder="alvin@gmail.com"
            value={clientEmail}
            onChange={(e) => setclientEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Choice of Service
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <input
                type="radio"
                name="service"
                className="radio radio-warning"
                id="Silver Package"
                value="Silver Package"
                checked={barType=== 'Silver Package'}
                onChange={(e) => setbarType(e.target.value)}
              />
              <label htmlFor="Silver Package" className="text-sm">
                SilverPackage ($250 1-6hrs)
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input
                type="radio"
                name="service"
                className="radio radio-warning"
                id="Reposado Package"
                value="Reposado Package"
                checked={barType=== 'Reposado Package'}
                onChange={(e) => setbarType(e.target.value)}
              />
              <label htmlFor="Reposado Package" className="text-sm">
                ReposadoPackage ($325 1-6hrs)
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input
                type="radio"
                name="service"
                className="radio radio-warning"
                id="Añejo Package"
                value="Añejo Package"
                checked={barType === 'Añejo Package'}
                onChange={(e) => setbarType(e.target.value)}
              />
              <label htmlFor="Añejo Package" className="text-sm">
                AñejoPackage ($400 1-5hrs)
              </label>
            </li>
          </ul>
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Name of Event
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
            placeholder="Ex: Marias Wedding"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Type of Event
<VenueType venueType={venueType}  onVenueChangeType={(e:any)=>setvenueType(e)} />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Address of Event
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
            placeholder="Ex: 1234 Mockingbird Lane, Houston, TX 75209"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          City
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
            placeholder="Houston"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Estimated Guess Count
        <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
            placeholder="ex: 50"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
    <BarOptions barOption={barOption} onBarOptionChange={(value:any)=>setBarOption(value)} />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Phone Number
          <input
            type="tel"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
            placeholder="ex: 469-768-6711"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Questions|Comments
          <textarea
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-white text-base"
            maxLength={200}
            placeholder="ex: Will you call us..?"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="flex flex-col justify-center items-center text-black bg-white border border-yellow-500 rounded-lg p-6 shadow-md overflow-auto">
          <h2 className="text-2xl font-bold ">Select the Day of Your Event</h2>
          <BookingCalender date={date} startTimne={startTime} onStartDateChange={(value:any)=>setStartTime(value)} endTime={endTime} onEndDateChange={(value:any)=> setEndTime(value)} onDateChange={(value:any)=>setDate(value)} />
        </div>
<div>
 <SourceList source={source} onSourceChange={(value: any) => setSource(value)} />
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
