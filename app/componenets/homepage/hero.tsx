'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import HeroBG from '../../../public/HeroBG.webp';

import { motion } from 'framer-motion';

const MainHero = () => {
  return (
    <div className="relative hero min-h-[30vh] lg:min-h-[50vh] md:h-[80vh] h-[30vh]  border border-bottom border-black">
      <div className="absolute inset-0 bg-black opacity-25 z-10"></div>
      <Image
        src={HeroBG}
        alt="Bar Bottles"
        objectFit="cover"
        layout="fill"
        className="absolute inset-0 z-0 opacity-50"
        placeholder="blur"
      />

      <div className="relative z-10 flex flex-col justify-around lg:flex-nowrap flex-wrap">
        <div className="flex flex-col justify-center items-center gap-4 text-[#FFFFF0]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-[#FFD700] text-center lg:text-7xl font-bold text-3xl z-10">
              VIDABEBIDASPROJECT
            </h1>
            <p className="text-2xl text-center z-10">
              El toque perfecto para tu evento especial.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-row gap-3 z-10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/booking">
              <Button
                className="bg-[#FFFFF0] rounded-sm text-black hover:bg-[#DC143C] hover:animate-pulse"
                variant="shadow"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/packages">
              <Button
                className="bg-[#DC143C] rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse"
                variant="shadow"
              >
                Packages
              </Button>
            </Link>
          </motion.div>

          {/* <motion.div
            className="flex justify-center z-10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 10 }}
            transition={{ duration: 1 }}
          >
            <Link href="/reviews">
              <Button
                className="bg-[#FFD700] text-black border border-[#DC143C] rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse"
                variant="shadow"
              >
                Leave a Review
              </Button>
            </Link>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default MainHero;
