'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@nextui-org/react';
import Image from 'next/image';

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



const ReviewPage = () => {

    const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
    useEffect(()=>{
  
      const ClientBooking= sessionStorage.getItem('clientbookinginfo')
    
  
      if(ClientBooking){
    
        const parsed=JSON.parse(ClientBooking)
  
        setBookingInfo(parsed)
      
      }else{
        console.log('No Booking Data Found')
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
        {/* Booking Details Section */}
        {bookingInfo && (
            <div className="mb-6 p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg border-2 border-yellow-500 shadow-md">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 text-[#DC143C]">
               Review of your Booking Details
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Event Information */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Event Name</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 break-words">{bookingInfo.venueName || 'Not specified'}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Event Type</p>
                    <p className="text-base sm:text-lg text-gray-800 break-words">{bookingInfo.venueType || 'Not specified'}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Service Package</p>
                    <p className="text-base sm:text-lg font-semibold text-yellow-600 break-words">{bookingInfo.barType || 'Not specified'}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Guest Count</p>
                    <p className="text-base sm:text-lg text-gray-800">{bookingInfo.guestCount || 'Not specified'} guests</p>
                  </div>
                </div>

                {/* Date, Time & Location */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Event Date</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 break-words">{formatDate(bookingInfo.date)}</p>
                  </div>
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Start Time</p>
                    <p className="text-base sm:text-lg text-gray-800">{formatTime(bookingInfo.startTime)}</p>
                  </div>
                  {bookingInfo.endTime && (
                    <div className="border-b border-gray-300 pb-2 sm:pb-3">
                      <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">End Time</p>
                      <p className="text-base sm:text-lg text-gray-800">{formatTime(bookingInfo.endTime)}</p>
                    </div>
                  )}
                  <div className="border-b border-gray-300 pb-2 sm:pb-3">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">Location</p>
                    <p className="text-base sm:text-lg text-gray-800 break-words">
                      {bookingInfo.address || 'Not specified'}
                      {bookingInfo.city && `, ${bookingInfo.city}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-gray-300">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-2 sm:mb-3">Your Contact Information</p>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base text-gray-800 break-all">
                    <span className="font-semibold">Email:</span> {bookingInfo.clientEmail}
                  </p>
                  {bookingInfo.clientPhone && (
                    <p className="text-sm sm:text-base text-gray-800 break-all">
                      <span className="font-semibold">Phone:</span> {bookingInfo.clientPhone}
                    </p>
                  )}
                </div>
              </div>

              {/* Waiver Status */}
              {bookingInfo.confirmWaiver && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-green-500 bg-green-50 rounded p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-green-700 uppercase mb-1 sm:mb-2">✓ Waiver Signed</p>
                  <p className="text-xs sm:text-sm text-green-600 break-words">
                    Electronic signature: {bookingInfo.electronicSignature}
                  </p>
                </div>
              )}

              {/* Additional Message */}
              {bookingInfo.message && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-2">Your Message</p>
                  <p className="text-sm sm:text-base text-gray-700 italic break-words">"{bookingInfo.message}"</p>
                </div>
              )}
            </div>
          )}
          <div className='flex flex-center items-center gap-5'>
          <Button
          className="bg-orange-400 rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse text-center "
          variant="shadow"
        //   onClick={createUser}
        >
          Complete Booking
        </Button>
        <Button
          className="bg-orange-400 rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse text-center "
          variant="shadow"
        //   onClick={createUser}
        >
          Re-Do Booking
        </Button>
          </div>

    </div>
  )
}

export default ReviewPage
