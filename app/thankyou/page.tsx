'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import About from '../about/page';
import { Button } from '@nextui-org/react';
const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen m-3 ">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-4">
          Thank you for completing your booking with VidaBebidasProject! We are
          excited to be a part of your event and look forward to providing you
          with exceptional service.
        </p>
        <p className="mb-4">
          You will receive a confirmation email shortly with all the details of
          your booking. If you have any questions or need further assistance,
          please don't hesitate to contact us.
        </p>
        <p className="mb-4">We can t wait to make your event special!</p>
        <Link href={'/about'}>
          <Button
            className="bg-[#FFD700] border rounded-sm border-white text-black hover:border-[#DC143C] hover:animate-pulse"
            variant="shadow"
          >
            Learn More About Michael
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
