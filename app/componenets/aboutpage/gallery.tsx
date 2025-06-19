import React from 'react';
import { Image } from '@nextui-org/react';
import { GalleryMotion } from './galleryMotion';

import Bar from '@/public/Bar.png'

interface Image {

  src: string
}
const Carousel = () => {
  return (
    <div className="w-full carousel">
      <div
        id="slide1"
        className="carousel-item relative w-full flex justify-center rounded-none"
      >
        <GalleryMotion>
          <Image
            isBlurred
            width={800}
            src="https://mikessite.s3.us-east-2.amazonaws.com/Mikethree.jpg"
            alt="Mike Bartending"
            className="imagegallery rounded-none"
          />
        </GalleryMotion>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-40">
          <a
            href="#slide3"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide2"
        className="carousel-item relative w-full flex justify-center rounded-none"
      >
        <GalleryMotion>
          <Image
            isBlurred
            width={800}
            src="https://mikessite.s3.us-east-2.amazonaws.com/MikePic.JPEG"
            alt="Mike Bartending"
            className="rounded-none"
          />
        </GalleryMotion>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-40">
          <a
            href="#slide1"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className="carousel-item relative w-full flex justify-center rounded-none"
      >
        <GalleryMotion>
          <Image
            isBlurred
            width={800}
            src="https://mikessite.s3.us-east-2.amazonaws.com/IMG_0989.JPEG"
            alt="Mike Bartending"
            className="imagegallery rounded-none"
          />
        </GalleryMotion>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-40">
          <a
            href="#slide2"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide4"
        className="carousel-item relative w-full flex justify-center rounded-none"
      >
        <GalleryMotion>
          <Image
            isBlurred
            width={800}
            src="/Bar.png"
            alt="New Gallery Image"
            className="imagegallery rounded-none"
          />
        </GalleryMotion>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-40">
          <a
            href="#slide3"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle bg-transparent border-[#FFFFF0]"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
