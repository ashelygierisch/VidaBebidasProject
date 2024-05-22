import React from 'react';
import ServicesSection from '../componenets/packagespage/servicessection';
import ImportantInfo from '../componenets/packagespage/importantinfo';
import AboutButton from '../componenets/aboutpage/aboutbutton';
import { PackageMotion } from '../componenets/packagespage/packagemotion';
import { Motion } from '../componenets/aboutpage/motion';
const Packages = () => {
  return (
    <div className="mt-[100px]">
      <Motion>
        <ImportantInfo />
      </Motion>

      <ServicesSection />

      <AboutButton />
    </div>
  );
};

export default Packages;
