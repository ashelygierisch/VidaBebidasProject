'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Button } from '@nextui-org/react';
import Image from 'next/image';

import posthog from 'posthog-js';


interface BookingInfo {
    // Client information
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    
    // Event details
    venueType: string;
    eventdate: Date | string;  // Could be Date object or ISO string
    startTime: string;     // Format like '00:00:00'
    endTime: string;       // Format like '00:00:00'
    venueName: string;
    city: string;
    address: string;
    guestCount: string | number;  // Could be string from input or number
    
     
  // Service details
  serviceType: string;         // ← Changed from 'barType'
  barOption: string;           // ← Added
  message: string;
  source: string;
  isDateAlreadyBooked?: boolean;  // ← Added (optional)
  
  // Waiver information
  confirmWaiver?: boolean;
  electronicSignature?: string;
  }



const ReviewPage = () => {
const router=useRouter()

const [isSubmitting, setIsSubmitting] = useState(false);

    const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
    useEffect(()=>{
      // Track review page view for funnel analytics
      posthog?.capture('Review Page Viewed');

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

    const completeBooking = async () => {
      if (!bookingInfo || isSubmitting) return;

      setIsSubmitting(true);
      // Format date string (e.g., "2026-02-15")
      const dateStr = typeof bookingInfo.eventdate === 'string' 
        ? bookingInfo.eventdate.split('T')[0] 
        : new Date(bookingInfo.eventdate).toISOString().split('T')[0];
      
      const payload = {
        eventDate: `${dateStr}T${bookingInfo.startTime}`,
        startTime: `${dateStr}T${bookingInfo.startTime}`,
        endTime: bookingInfo.endTime ? `${dateStr}T${bookingInfo.endTime}` : null,
        serviceType: bookingInfo.serviceType, // or a separate field
        
        clientName: bookingInfo.clientName,
        clientEmail: bookingInfo.clientEmail,
        clientPhone: bookingInfo.clientPhone,
        
        venueName: bookingInfo.venueName,
        venueType: bookingInfo.venueType,
        address: bookingInfo.address,
        city: bookingInfo.city,
        guestCount: parseInt(bookingInfo.guestCount as string) || null,
        barOption: bookingInfo.barOption,
        message: bookingInfo.message,
        
        source: bookingInfo.source, // ensure it matches enum
        electronicSignature: bookingInfo.electronicSignature,
        confirmWaiver: bookingInfo.confirmWaiver,
      };
      
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      
      if (response.ok) {
        
        posthog?.identify(bookingInfo.clientEmail, {
          name: bookingInfo.clientName,
          email: bookingInfo.clientEmail,
          phone: bookingInfo.clientPhone
        });

        
        posthog?.capture('Booking Confirmed', {
          serviceType: bookingInfo.serviceType,
          venueType: bookingInfo.venueType,
          guestCount: bookingInfo.guestCount,
          city: bookingInfo.city,
          barOption: bookingInfo.barOption,
          source: bookingInfo.source,
          waiverSigned: bookingInfo.confirmWaiver ?? false
        });

        sessionStorage.removeItem('clientbookinginfo');
        router.push(`/thankyou?name=${bookingInfo.clientName}`);
      } else {
        const errorData = await response.json();
        console.log( 'API Error', errorData)
        toast.error(errorData.error || 'Failed to complete booking please contact us at +1 (214-893-2926) ');
        setIsSubmitting(false);
      }
    };

    const redoBooking=async ()=>{
        sessionStorage.clear()
posthog?.capture('Booking Redo', {
  serviceType: bookingInfo?.serviceType,
  venueType: bookingInfo?.venueType,
  guestCount: bookingInfo?.guestCount,
});

       router.push(`/booking`)

    }
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
                    <p className="text-base sm:text-lg font-semibold text-yellow-600 break-words">{bookingInfo.serviceType || 'Not specified'}</p>
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
                    <p className="text-base sm:text-lg font-bold text-gray-800 break-words">{formatDate(bookingInfo.eventdate)}</p>
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
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onClick={completeBooking}
        >
            {isSubmitting ? 'Submitting...' : 'Complete Booking'}
        </Button>
        <Button
          className="bg-orange-400 rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse text-center "
          variant="shadow"
          onClick={redoBooking}
        >
          Re-Do Booking
        </Button>
          </div>

    </div>
  )
}

export default ReviewPage
