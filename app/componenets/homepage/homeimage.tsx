import React from 'react';
import { Image } from '@nextui-org/react';

import Mike from '../../../public/MikeHome.jpg';

const HomeImage = () => {
  return (
    <div className="flex justify-center pt-10">
      <Image
        className="rounded-sm "
        width={300}
        alt="Michael Estrada"
        src={Mike.src}
      />
    </div>
  );
};

export default HomeImage;
