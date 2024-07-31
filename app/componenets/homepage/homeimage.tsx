import React from 'react';
import { Image } from '@nextui-org/react';

import SampleImage from '../../../public/Sameplimage.png';

const HomeImage = () => {
  return (
    <div className="flex justify-center pt-10">
      <Image
        className="rounded-full "
        width={300}
        alt="Michael Estrada"
        src={SampleImage.src}
      />
    </div>
  );
};

export default HomeImage;
