
'use client'
import React from 'react'
import { Image } from '@nextui-org/react';

import Mike from '../../../public/MikeatWork.jpeg';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
const HomeImage = () => {
  const image = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: image,
    offset: ['start end', 'end end'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);

  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);


  return (
    <div className="flex justify-center pt-10">
             <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: '800px',
          }}
        >
      <Image
        className="rounded-sm "
        width={300}
        alt="Michael Estrada"
        src={Mike.src}
        ref={image}
      />

      </motion.div>
    </div>
  );
};

export default HomeImage;
