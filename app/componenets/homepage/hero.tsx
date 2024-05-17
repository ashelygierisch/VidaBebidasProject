'use client';
import React from 'react';
import { Button } from '@nextui-org/react';

import Link from 'next/link';
const MainHero = () => {
  return (
    <div
      className=" hero min-h-screen-main  border border-bottom border-black  "
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg)',
      }}
    >
      <div className="lg:flex lg:flex-col lg:flex-nowrap flex-wrap flex-col justify-around">
        <div className="flex flex-col justify-center items-center gap-4 text-[#FFFFF0]">
          <h1 className="text-[#FFD700] lg:text-7xl FONT-BOLD text-4xl ">
            VIDABEBIDASPROJECT
          </h1>
          <p className="text-2xl text-center">
            El toque perfecto para tu evento especial.
          </p>
          <div className="flex flex-row gap-3">
            <Link href={'/contact'}>
              <Button
                className="bg-[#FFFFF0] text-black hover:bg-[#DC143C] "
                variant="shadow"
              >
                Book Now
              </Button>
            </Link>
            <Link href={'/services'}>
              <Button
                className="bg-[#DC143C] hover:bg-[#FFFFF0] hover:text-black"
                variant="shadow"
              >
                Packages
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href={'/contact'}>
              <Button
                className="bg-transparent border border-[#DC143C] hover:bg-[#FFFFF0] hover:text-black"
                variant="shadow"
              >
                Leave a Review
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
