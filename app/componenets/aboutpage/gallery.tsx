import React from 'react';
import { Image } from '@nextui-org/react';
const Gallery = () => {
  return (
    <div className=" w-full  carousel ">
      <div className="carousel-item w-full flex justify-center rounded-none">
        <Image
          isBlurred
          width={800}
          src="https://mikessite.s3.us-east-2.amazonaws.com/MikePic.JPEG"
          alt="Mike Bartending"
          className=" imagegallery  rounded-none"
        />
      </div>
      <div className="carousel-item w-full rounded-none flex justify-center">
        <Image
          isBlurred
          width={800}
          src="https://mikessite.s3.us-east-2.amazonaws.com/Mikethree.jpg"
          alt="Mike Bartending"
          className="   rounded-none"
        />
      </div>
      <div className="carousel-item w-full rounded-none flex justify-center">
        <Image
          isBlurred
          width={800}
          src="https://mikessite.s3.us-east-2.amazonaws.com/IMG_0989.JPEG"
          alt="Mike Bartending"
          className=" imagegallery  rounded-none"
        />
      </div>
    </div>
  );
};

export default Gallery;
