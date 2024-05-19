import React from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import PackageData from '../../packagesData.json';

const ServicesSection = () => {
  return (
    <div>
      <h2 className="text-5xl text-[#FFFFF0] text-center m-5">Packages</h2>
      <div>
        {PackageData.map((pck) => (
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-65"
            shadow="sm"
            key={pck.id}
          >
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-1">
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    shadow="md"
                    src="https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    width="100%"
                  />
                </div>
                <div className="flex flex-col col-span-1 ">
                  <h1 className="text-4xl text-center">{pck.name}</h1>
                  <p className="text-start">Price of Package</p>
                  <ul className="text-start">
                    <li>Description One</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
