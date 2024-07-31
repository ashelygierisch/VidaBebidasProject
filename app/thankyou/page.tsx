'use client';
import React, { useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@nextui-org/react';
import Image from 'next/image';

const ThankYou = () => {
  useEffect(() => {
    sessionStorage.removeItem('bookingId');
  }, []);

  return (
    <div className="mt-[100px]">
      <div className="flex flex-col items-center justify-center h-screen m-5 ">
        <div className="bg-white p-6 rounded-lg shadow-lg text-black">
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg mb-4">
            Thank you for booking with VidaBebidasProject! I am excited to be a
            part of your event and look forward to providing exceptional
            service.
          </p>
          <p className="mb-4">
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
          <p className="mb-4">
            <span className="icon-[material-symbols--phone-forwarded] inline-block text-black"></span>
            {'   '}
            <a href="tel:214-809-7270" className="text-black m-2">
              +1 (214-893-2926)
            </a>
          </p>
          <p className="mb-4">We can t wait to make your event special!</p>
          <div className="mb-6 md:mb-0 flex justify-center align-center m-5">
            <a href="/" className="flex items-center">
              <Image
                src="/logo-white.png"
                className=" me-3 pb-5 h-[70px]"
                alt="LogoBebidasProject"
                width={300}
                height={100}
              />
            </a>
          </div>
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
    </div>
  );
};

export default ThankYou;
