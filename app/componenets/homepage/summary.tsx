import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Summary = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-16 z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-4xl mx-auto border-b border-[#FFFFF0]/30 pb-8">
        <p className="leading-relaxed text-center text-lg md:text-2xl lg:text-4xl mb-12 text-white font-light">
          Introducing Michael Estrada, owner of{' '}
          <span className="text-[#FFD700] font-medium hover:text-[#FFF000] transition-colors duration-300">
            Vidabebidasproject
          </span>
          , a mobile bartending service! Michael brings a passion of creating{' '}
          <span className="text-[#FFD700] font-medium hover:text-[#FFF000] transition-colors duration-300">
            memorable experiences
          </span>{' '}
          to every event, from the bar to the guests!
        </p>
        <div className="flex justify-center">
          <Link href={'/about'}>
            <Button
              className="px-8 py-6 bg-transparent border-2 rounded-md border-white/80 text-white 
                hover:border-[#DC143C] hover:bg-[#DC143C]/10 hover:scale-105 
                transition-all duration-300 text-lg font-medium"
              variant="shadow"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Summary;
