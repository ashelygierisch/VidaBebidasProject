'use client';
import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import HeroBG from '../../../public/HeroBG.webp';
import { motion } from 'framer-motion';

const MainHero = () => {
  return (
    <div className="relative min-h-[80vh] border-b border-[#FFFFF0]/30">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <Image
        src={HeroBG}
        alt="Bar Bottles"
        objectFit="cover"
        layout="fill"
        className="absolute inset-0 z-0"
        placeholder="blur"
        priority
      />

      <div className="relative h-full z-20 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-[#FFD700] tracking-wider">
              VIDABEBIDASPROJECT
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-[#FFFFF0] font-light">
              El toque perfecto para tu evento especial.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <Link href="/booking">
              <Button
                className="px-8 py-6 bg-[#FFFFF0] text-black border-2 border-transparent
                  hover:bg-[#FFFFF0]/90 hover:border-[#DC143C] hover:scale-105
                  transition-all duration-300 text-lg font-medium min-w-[160px]"
                variant="shadow"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/packages">
              <Button
                className="px-8 py-6 bg-[#DC143C] text-white border-2 border-transparent
                  hover:bg-[#DC143C]/90 hover:border-[#FFFFF0] hover:scale-105
                  transition-all duration-300 text-lg font-medium min-w-[160px]"
                variant="shadow"
              >
                Packages
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
