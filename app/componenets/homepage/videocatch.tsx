'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Mike from '@/public/mike3.jpg';

const VideoCatch = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = require('../../../public/MB22.webm');
    video.preload = 'auto';
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = (error: any) => {
    console.error('Video loading error:', error);
    setHasError(true);
  };

  return (
    <div className="video-container border-b-1 border-[#FFFFF0]">
      <div className={`${isVideoLoaded ? 'hidden' : 'block'}`}>
        <Image 
          src={Mike} 
          alt="Michael Poster"
          priority 
          className="w-full h-auto"
        />
      </div>
      
      <div className={isVideoLoaded ? 'visible' : 'hidden'}>
        <div className="content">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href={'/packages'}>
              <Button
                className="bg-transparent border rounded-sm border-[#DC143C] hover:border-white animate-pulse"
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
            
            poster={Mike.src}
            preload="auto"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            className="video"
          />
        </div>
      </div>

      {hasError && (
        <div className="text-center p-4">
          <p>Failed to load video. Please try refreshing the page.</p>
        </div>
      )}
    </div>
  );
};

export default VideoCatch;
