import React from 'react';
import { Button } from '@nextui-org/react';

import Link from 'next/link';
import { Motion } from './motion';
const MikeInfo = () => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap  m-10 ">
      <Motion>
        <div className="flex flex-col gap-5 border-b-1 border-[#FFFFF0]">
          <h2 className="text-4xl text-center text-[#FFD700]">
            Michael Estrada
          </h2>
          <p className="text-wrap text-center lg:text-2xl leading-7 m-3 mb-1">
            Born and raised in Dallas, Texas, Michael is a
            professional bartender who brings exceptional service to every event
            through his business, VidaBebidasProject. With three customizable
            packages, he caters to a variety of customer needs, ensuring a
            tailored and memorable experience for all. When he&apos;s not
            providing top-notch bartending at venues, Michael works full-time at
            a restaurant, honing his skills and passion for mixology. His
            commitment and dedication makes Vidabebidasproject a trusted choice
            for any occasion.
          </p>
          <div className="flex justify-center m-3">
            <Link href={'/packages'}>
              <Button
                className="bg-[#FFFFF0] text-black rounded-sm hover:bg-[#DC143C] "
                variant="shadow"
              >
                Packages
              </Button>
            </Link>
          </div>
        </div>
      </Motion>
    </div>
  );
};

export default MikeInfo;
