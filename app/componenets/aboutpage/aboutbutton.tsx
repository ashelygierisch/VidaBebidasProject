import React from 'react';
import { Button } from '@nextui-org/react';

import Link from 'next/link';
import { Image } from '@nextui-org/react';
const AboutButton = () => {
  return (
    <div className="flex justify-center">
      <Link href={'/contact'}>
        <Button
          className="bg-[#FFFFF0] rounded-sm text-black hover:bg-[#DC143C] m-10"
          variant="shadow"
        >
          Book Now
        </Button>
      </Link>
    </div>
  );
};

export default AboutButton;
