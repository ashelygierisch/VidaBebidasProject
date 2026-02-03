'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@nextui-org/react';
import Image from 'next/image';
import ConfettiAnimation from '../componenets/confettianimation';

interface BookingInfo {
  // Client information
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  
  // Event details
  venueType: string;
  date: Date | string;  // Could be Date object or ISO string
  startTime: string;     // Format like '00:00:00'
  endTime: string;       // Format like '00:00:00'
  venueName: string;
  city: string;
  address: string;
  guestCount: string | number;  // Could be string from input or number
  
  // Service details
  barType: string;
  message: string;
  source: string;
  
  // Waiver information (added in waiver page)
  confirmWaiver?: boolean;           // Optional because added later
  electronicSignature?: string;      // Optional because added later
}
const ThankYou = () => {

  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  useEffect(()=>{

    const ClientBooking= sessionStorage.getItem('clientbookinginfo')
  

    if(ClientBooking){
  
      const parsed=JSON.parse(ClientBooking)

      setBookingInfo(parsed)
    }

  }, [])

  // Helper function to format date
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'Not specified';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to format time
  const formatTime = (time: string | undefined): string => {
    if (!time) return 'Not specified';
    // Handle format like '00:00:00' or 'HH:mm:ss'
    const timeParts = time.split(':');
    if (timeParts.length >= 2) {
      const hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes} ${ampm}`;
    }
    return time;
  };

 


  return (
    <div className="mt-[6rem] py-4 px-4 sm:px-6 lg:px-8">
       <ConfettiAnimation />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] py-8">
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg text-black w-full max-w-4xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center sm:text-left">
            Thank You {bookingInfo?.clientName}!
          </h1>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
            Thank you for booking with VidaBebidasProject! I am excited to be a
            part of your event and look forward to providing exceptional
            service.
          </p>

        
          <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            I will be in contact with you soon, and you will receive a
            confirmation email shortly with all the details of your booking.{' '}
            <span className="font-bold text-red-700">
              Please check your inbox and spam folder,
            </span>{' '}
            as sometimes our emails may be mistakenly filtered.{' '}
            <span className="font-bold text-red-700">
              If found in spam, simply select our email as &quot;not spam&quot;
              to see booking details clearly.{' '}
            </span>
            If you have any questions or need further assistance, please don{''}
            t hesitate to contact us.
          </p>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            <span className="icon-[material-symbols--phone-forwarded] inline-block text-black mr-2"></span>
            <a href="tel:214-893-2926" className="text-black hover:text-[#DC143C] transition-colors">
              +1 (214-893-2926)
            </a>
          </p>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">We can&apos;t wait to make your event special!</p>
          <div className="mb-6 sm:mb-8 flex justify-center items-center">
            <a href="/" className="flex items-center">
              <Image
                src="/VB-Logo-2026.png"
                className="w-auto h-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[300px]"
                alt="LogoBebidasProject"
                width={300}
                height={100}
              />
            </a>
          </div>
          <div className="flex justify-center">
            <Link href={'/about'}>
              <Button
                className="bg-[#FFD700] border rounded-sm border-white text-black hover:border-[#DC143C] hover:animate-pulse w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                variant="shadow"
              >
                Learn More About Michael
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
