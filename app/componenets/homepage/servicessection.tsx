import React from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';

const ServicesSection = () => {
  return (
    <div>
      <h2 className="text-5xl text-[#FFFFF0] text-center m-5">Packages</h2>
      <div>
        {' '}
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src="https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  width="100%"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ServicesSection;
