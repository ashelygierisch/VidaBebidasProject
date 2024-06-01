import React from 'react';

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
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <motion.div
                className="flex flex-row gap-3 z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <blockquote>
                  <p className="text-md font-medium text-gray-900 dark:text-white leading-10">
                    &quot;{review.reviews}&quot;
                  </p>
                </blockquote>
              </motion.div>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white mb-4">
                    {review.author}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
          <div className="flex justify-center pt-10">
            <Link href={'/packages'}>
              <Button
                className="bg-transparent border rounded-sm border-[#DC143C] hover:bg-[#FFFFF0] hover:text-black hover:animate-pulse"
                variant="shadow"
              >
                Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
