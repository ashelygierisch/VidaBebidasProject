import React from 'react';

import { Image } from '@nextui-org/react';
const MikeInfo = () => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap lg:flex-nowrap m-10">
      {' '}
      <h2>Michael Estrada</h2>
      <Image
        isBlurred
        width={400}
        src="https://mikessite.s3.us-east-2.amazonaws.com/MikePic.JPEG"
        alt="Mike Bartending"
        className="pt-3 lg:m-10"
      />
    </div>
  );
};

export default MikeInfo;
