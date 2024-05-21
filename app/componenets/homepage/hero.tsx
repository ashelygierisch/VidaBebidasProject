'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import HeroBG from '../../../public/HeroBG.jpeg';


import { motion } from "framer-motion"

const MainHero = () => {
  return (
    <div className="relative hero min-h-screen lg:min-h-screen md:h-[80vh] h-[30vh]  border border-bottom border-black">
      <div className="absolute inset-0 bg-black opacity-15 z-10"></div>
      <Image
        src={HeroBG}
        alt="Bar Bottles"
        objectFit="cover"
        layout="fill"
        className="absolute inset-0 z-0 "
        placeholder="blur"
      />

      <div className="relative z-10 flex flex-col justify-around lg:flex-nowrap flex-wrap">
        <div className="flex flex-col justify-center items-center gap-4 text-[#FFFFF0]">
          {/* <motion.div     initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>  */}

          <h1 className="text-[#FFD700] lg:text-7xl font-bold text-3xl z-10">
            VIDABEBIDASPROJECT
          </h1>
          <p className="text-2xl text-center z-10">
            El toque perfecto para tu evento especial.
          </p>
       
      
        
          <motion.div className="flex flex-row gap-3 z-10" initial={{ opacity: 0, y: 100 }}   animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.6 }} >
          
            <Link href="/contact">
              <Button
                className="bg-[#FFFFF0] rounded-sm text-black hover:bg-[#DC143C]"
                variant="shadow"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/packages">
              <Button
                className="bg-[#DC143C] rounded-sm hover:bg-[#FFFFF0] hover:text-black"
                variant="shadow"
              >
                Packages
              </Button>
            </Link>
            </motion.div>
        
          <motion.div className="flex justify-center z-10" initial={{ opacity: 0, y: 100 }}   animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.6 }}>
            <Link href="/contact">
              <Button
                className="bg-[#FFD700] text-black border border-[#DC143C] rounded-sm hover:bg-[#FFFFF0] hover:text-black"
                variant="shadow"
              >
                Leave a Review
              </Button>
            </Link>
          </motion.div>
      
        </div>
        
      </div>
    </div>
  );
};

export default MainHero;
