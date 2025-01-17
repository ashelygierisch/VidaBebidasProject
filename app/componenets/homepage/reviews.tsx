import React from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReviewsData from '../../reviewsData.json';

const Reviews = () => {
  return (
    <div className="flex justify-center border-b border-[#FFFFF0]/30">
      <section className="bg-transparent w-full">
        <div className="max-w-4xl px-4 py-16 mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-medium text-white mb-12"
          >
            What Clients Say
          </motion.h2>

          {ReviewsData.map((review, index) => (
            <motion.figure
              key={review.id}
              className="mx-auto mb-12 last:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: index * 0.2,
              }}
            >
              <blockquote className="relative">
                <RiDoubleQuotesL className="absolute -top-4 -left-4 text-[#FFD700]/30 lg:text-4xl text-xl ml-2" />
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed px-8">
                  {review.reviews}
                </p>
                <RiDoubleQuotesR className="absolute -bottom-4 -right-4 text-[#FFD700]/30 lg:text-4xl text-xl mr-2" />
              </blockquote>
              <figcaption className="mt-6">
                <div className="flex items-center justify-center">
                  <div className="font-medium text-[#FFD700] text-lg">
                    {review.author}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}

          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/booking">
              <Button
                className="px-8 py-6 bg-[#FFD700] text-black border-2 border-[#DC143C] 
                  rounded-md hover:bg-[#FFD700]/90 hover:scale-105 
                  transition-all duration-300 text-lg font-medium"
                variant="shadow"
              >
                Book Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
