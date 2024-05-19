import React from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
const VideoCatch = () => {
  return (
    <div className="video-container border-b-1 border-[#FFFFF0] ">
      <div className="content">
        <Link href={'/packages'}>
          <Button
            className="bg-transparent border border-[#DC143C] hover:border-white"
            variant="shadow"
          >
            Explore the Packages
          </Button>
        </Link>
      </div>
      <div className="video-overlay">
        <video
          src={require('../../../public/MB.mp4')}
          autoPlay
          playsInline
          loop
          muted
          className="video"
        />
      </div>
    </div>
  );
};

export default VideoCatch;
