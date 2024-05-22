import React from 'react';
import MikeInfo from '../componenets/aboutpage/mikeinfo';
import Gallery from '../componenets/aboutpage/gallery';
import AboutButton from '../componenets/aboutpage/aboutbutton';
import { Motion } from '../componenets/aboutpage/motion';
export default async function About() {
  return (
    <div className="mt-[150px]">
      <MikeInfo />
      <Motion>
        <Gallery />
      </Motion>
    </div>
  );
}
