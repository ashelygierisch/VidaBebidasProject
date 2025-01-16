import React from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { motion } from 'framer-motion';

import ReviewsData from '../../reviewsData.json';
const Reviews = () => {
  return (
    <div className="flex justify-center border-b-1 border-[#FFFFF0]  ">
      <section className="bg-white dark:bg-black">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          {ReviewsData.map((review) => (
            <figure className="max-w-screen-md mx-auto" key={review.id}>
              <motion.div
                className="flex flex-row gap-3 z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                >
                <blockquote>
                  <p className="text-md font-medium text-gray-900 dark:text-white/70 leading-10 p-4">
              
                    &quot;{review.reviews}&quot;
              
                  </p>
                </blockquote>
              </motion.div>
              <figcaption className="flex items-center justify-center mt-4 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-[#FFD700] mb-2">
                    - { " " } {review.author}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
          <div className="flex justify-center pt-10">
          <Link href="/reviews">
              <Button
                className="bg-[#FFD700] text-black border border-[#DC143C] rounded-sm hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse"
                variant="shadow"
              >
                Leave a Review
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
