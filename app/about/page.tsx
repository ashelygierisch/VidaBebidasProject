import React from 'react';
import MikeInfo from '../componenets/aboutpage/mikeinfo';
import Gallery from '../componenets/aboutpage/gallery';
import AboutButton from '../componenets/aboutpage/aboutbutton';
export default async function About() {
  return (
    <div>
      <MikeInfo />
      <Gallery />
      <AboutButton />
    </div>
  );
}
