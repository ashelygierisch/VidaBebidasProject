import React from 'react';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const VideoCatch = () => {
  return (
    <div className="video-container border-b-1 border-[#FFFFF0] ">
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
          src={require('../../../public/MB.mp4')}
          autoPlay
          playsInline
          loop
          preload="metadata"
          // muted
          className="video"
        />
      </div>
    </div>
  );
};

export default VideoCatch;
