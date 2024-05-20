import React from 'react';
import ServicesSection from '../componenets/packagespage/servicessection';
import ImportantInfo from '../componenets/packagespage/importantinfo';
import AboutButton from '../componenets/aboutpage/aboutbutton';
const Packages = () => {
  return (
    <div className="mt-[100px]">
      <ImportantInfo />
      <ServicesSection />
      <AboutButton />
    </div>
  );
};

export default Packages;
