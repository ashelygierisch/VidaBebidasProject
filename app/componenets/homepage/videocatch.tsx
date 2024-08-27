'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Spinner } from '@nextui-org/react';
const VideoCatch = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="video-container border-b-1 border-[#FFFFF0] ">
      {!isVideoLoaded && (
        <div className="flex justify-center items-center z-3 m-5">
          <Spinner
            label="Michael at Work..."
            color="warning"
            className="text-5xl"
          />
        </div>
      )}
      <div className={isVideoLoaded ? 'visible' : 'hidden'}>
        <div className="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href={'/packages'}>
              <Button
                className="bg-transparent border  rounded-sm border-[#DC143C] hover:border-white animate-pulse"
                variant="shadow"
              >
                Explore the Packages
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="video-overlay">
          <video
            src={require('../../../public/MB22.webm')}
            autoPlay
            playsInline
            loop
            preload="metadata"
            onLoadedData={handleVideoLoaded}
            className="video"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCatch;
