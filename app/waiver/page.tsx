'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
const WaiverForm = () => {
  const router = useRouter();

  const submitWaiver = () => {
    // Handle waiver submission
    toast.success('Waiver Accepted and Booking Successful!');
    router.push('/thank-you'); // Redirect to a thank you page or another page
  };

  return (
    <div className="mt-[100px]">
      <div className="flex justify-center">
        <div className="waiver-form">
          <h1 className="font-bold text-2xl">Waiver Form</h1>
          <p>
            Please read and accept the waiver terms to proceed with your
            booking.
          </p>
          <textarea className="waiver-text" readOnly>
            {/* Waiver text here */}
          </textarea>
          <Button
            className="border rounded-sm border-white text-white hover:border-[#DC143C] hover:animate-pulse"
            variant="shadow"
            onClick={submitWaiver}
          >
            Accept Waiver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaiverForm;
