import React from 'react';
import { Button } from '@nextui-org/react';

import Link from 'next/link';
import { Image } from '@nextui-org/react';
const MikeInfo = () => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap  m-10 ">
      <div className="flex flex-col gap-5">
        <h2 className="text-4xl text-center text-[#FFD700]">Michael Estrada</h2>
        <p className="text-wrap text-center lg:text-2xl leading-7">
          Michael is a dedicated and professional bartender who brings
          exceptional service to every event through his business,
          VidaBebidasProject. With three customizable packages, he caters to a
          variety of customer needs, ensuring a tailored and memorable
          experience for all. When he&apos;s not providing top-notch bartending
          at venues, Michael works full-time at a restaurant, honing his skills
          and passion for mixology. His commitment to excellence and
          professionalism makes VidaBebidasProject a trusted choice for any
          occasion.
        </p>
      </div>
      <Image
        isBlurred
        width={500}
        src="https://mikessite.s3.us-east-2.amazonaws.com/MikePic.JPEG"
        alt="Mike Bartending"
        className="pt-3 lg:m-10 pt-10"
      />
      <Link href={'/contact'}>
        <Button
          className="bg-[#FFFFF0] text-black hover:bg-[#DC143C] m-10"
          variant="shadow"
        >
          Book Now
        </Button>
      </Link>
    </div>
  );
};

export default MikeInfo;
