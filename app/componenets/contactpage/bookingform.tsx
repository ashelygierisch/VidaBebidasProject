'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import { toast } from 'react-hot-toast';
import dayjs, { Dayjs } from 'dayjs';
import posthog from 'posthog-js';
import BookedDates from './bookedDates';
import BookingDetails from './bookingDetails';

import SourceList from './sourcelist';
import BookingCalender from './bookingCalendar';

import BarOptions from './baroptions'
import VenueType from './venuetype';
import { isDate, setDate } from 'date-fns';
import { error } from 'console';
const BookingForm = () => {
  
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
const [isDateAlreadyBooked, setIsDateAlreadyBooked] = useState(false);

  const [clientEmail, setclientEmail] = useState('');
  const [clientName, setclientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const[status,setStatus]=useState("PENDING");

  const [venueType,setvenueType]=useState('')
  const [venueName,setVenueName]=useState('');
  const [city, setCity]=useState('')
  const [address,setAddress]=useState('')
  const [guestCount,setGuestCount]=useState('')
  const [serviceType, setserviceType] = useState('');

  const [eventdate, setEventDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime]=useState('00:00:00');
  const [endTime, setEndTime]=useState('00:00:00')

  const [message, setMessage] = useState('');

  const [barOption, setBarOption]=useState('')
  const [source,setSource]=useState('')

  const [mounted, setMounted] = useState(false);



  const router = useRouter();

  useEffect(() => {
    // Track form view for funnel analytics
    posthog?.capture('Booking Form Viewed');

    const fetchBookedDates = async () => {
      try {
        const res = await fetch('/api/bookings', {
          cache: 'no-store', 
        });
        const data = await res.json();
        console.log('Fetched booked dates:', data);
        // Ensure data is an array before mapping
        if (Array.isArray(data)) {
          const dates = data.map((booking: any) => new Date(booking.eventDate));
          setBookedDates(dates);
        } else {
          console.warn('API did not return an array:', data);
          setBookedDates([]);
        }
      } catch (error) {
        console.error('Failed to fetch booked dates:', error);
        setBookedDates([]);
      }
    };
    fetchBookedDates();
  }, []);



  const handleDateChange = (selectedDate: Date) => {
    const isBooked = (bookedDates || []).some(
      d => d.toDateString() === selectedDate?.toDateString()
    );

    console.log('Is booked?', isBooked);
    
    if (isBooked) {
      toast(
        'This date already has a booking. You can still request service- staff will confirm availability.',
        {
          icon: '⚠️',
          duration: 10000,
          style: {
            background: '#FEF3C7',
            color: '#92400E',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '500',
            border: '2px solid #F59E0B',
            maxWidth: '500px',
            textAlign: 'center',
          },
        }
      );
      setIsDateAlreadyBooked(true);

    } else {
      setIsDateAlreadyBooked(false);
    
    }
    
    setEventDate(selectedDate);
  };
  
  
  const storeInfo = async () => {
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

    if (!serviceType) {
      toast.error('Please choose a Service');
    }



    const newEndTime = dayjs(startTime, 'HH:mm').add(5, 'hour').format('HH:mm');

 



const ClientBooking={
  clientName,
  clientEmail,
  clientPhone,
  venueType,
  eventdate,
  startTime,
  endTime: newEndTime,
  venueName,
  city,
  address,
  status,
  guestCount,
  isDateAlreadyBooked,
  message,
  source,
 serviceType,
 barOption,
}
    sessionStorage.setItem('clientbookinginfo', JSON.stringify(ClientBooking))
     

    console.log("Client & Booking Info stored", ClientBooking)
    
    // Track proceeding to waiver for funnel analytics
    posthog?.capture('Proceeded to Waiver', {
      serviceType: serviceType,
      city: city,
      source: source,
      guestCount: guestCount,
    });

    router.push(`/waiver?email=${clientEmail}&name=${clientName}`);


  };


  return (
    <div className="flex justify-center py-10 bg-black min-h-screen">
      <form className="flex flex-col gap-5 p-6 bg-white w-full max-w-lg border border-gray-300 rounded-lg shadow-lg m-2">
        <h1 className="font-bold text-3xl text-center text-gray-800">
          VidaBebidasProject Booking Form
        </h1>

        {/* SECTION 1: Service & Availability */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-yellow-600 mb-3">Service & Availability</h2>
          
          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
            Choose Your Package
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <input
                  type="radio"
                  name="service"
                  className="radio radio-warning"
                  id="Silver Package"
                  value="Silver Package"
                  checked={serviceType=== 'Silver Package'}
                  onChange={(e) => {
                    setserviceType(e.target.value);
                    posthog?.capture('Package Selected', { package: e.target.value, price: 300 });
                  }}
                />
                <label htmlFor="Silver Package" className="text-base flex flex-wrap items-center gap-1">
                  <span className="font-bold">Silver Package</span>
                  <span className="text-green-600 font-bold">$300</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-orange-500 font-semibold">5 hours</span>
                </label>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="radio"
                  name="service"
                  className="radio radio-warning"
                  id="Reposado Package"
                  value="Reposado Package"
                  checked={serviceType=== 'Reposado Package'}
                  onChange={(e) => {
                    setserviceType(e.target.value);
                    posthog?.capture('Package Selected', { package: e.target.value, price: 400 });
                  }}
                />
                <label htmlFor="Reposado Package" className="text-base flex flex-wrap items-center gap-1">
                  <span className="font-bold">Reposado Package</span>
                  <span className="text-green-600 font-bold">$400</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-orange-500 font-semibold">5 hours</span>
                </label>
              </li>
              <li className="flex items-center gap-2">
                <input
                  type="radio"
                  name="service"
                  className="radio radio-warning"
                  id="Añejo Package"
                  value="Añejo Package"
                  checked={serviceType === 'Añejo Package'}
                  onChange={(e) => {
                    setserviceType(e.target.value);
                    posthog?.capture('Package Selected', { package: e.target.value, price: 500 });
                  }}
                />
                <label htmlFor="Añejo Package" className="text-base flex flex-wrap items-center gap-1">
                  <span className="font-bold">Añejo Package</span>
                  <span className="text-green-600 font-bold">$500</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-orange-500 font-semibold">5 hours</span>
                </label>
              </li>
            </ul>
          </label>

          <div className="flex flex-col justify-center items-center text-black bg-white border border-yellow-500 rounded-lg p-6 shadow-md overflow-auto">
            <h3 className="text-xl font-bold mb-2">Select Date & Start Time</h3>
            <BookingCalender date={eventdate} startTime={startTime} onStartDateChange={(value:any)=>setStartTime(value)} onDateChange={handleDateChange} />
          </div>
        </div>

        {/* SECTION 2: Event Details */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-yellow-600 mb-3">Event Details</h2>
          
          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            Type of Event
            <VenueType venueType={venueType} onVenueChangeType={(e:any)=>setvenueType(e)} />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            Name of Event
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="Ex: Maria's Wedding"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Estimated Guest Count
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="ex: 50"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />
          </label>
        </div>

        {/* SECTION 3: Location */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-yellow-600 mb-3">Location</h2>
          
          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            Address of Event
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="Ex: 1234 Mockingbird Lane, Dallas, TX 75209"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            City
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="Dallas"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-700">
            <BarOptions barOption={barOption} onBarOptionChange={(value:any)=>setBarOption(value)} />
          </label>
        </div>

        {/* SECTION 4: Contact Information */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold text-yellow-600 mb-3">Contact Information</h2>
          
          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            Your Name
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="Alvin"
              value={clientName}
              onChange={(e) => setclientName(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            Email
            <input
              type="email"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-base"
              placeholder="alvin@gmail.com"
              value={clientEmail}
              onChange={(e) => setclientEmail(e.target.value)}
            />
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
        </div>

        {/* SECTION 5: Additional Information */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-600 mb-3">Additional Information</h2>
          
          <label className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
            Questions or Comments
            <textarea
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-white text-base"
              maxLength={200}
              placeholder="Any special requests or questions?"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <SourceList source={source} onSourceChange={(value: any) => setSource(value)} />
        </div>
        <Button
          className="bg-orange-400 rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse"
          variant="shadow"
          onClick={storeInfo}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
