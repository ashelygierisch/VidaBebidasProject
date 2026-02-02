import React from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import PackageData from '../../packagesData.json';
import { PackageMotion } from './packagemotion';
import Link from 'next/link';

const ServicesSection = () => {
  return (
    <div className="mt-5">
      <div className="space-y-6">
        {PackageData.map((pck) => (
          <PackageMotion key={pck.id}>
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 w-65 "
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-1">
                    <Image
                      alt="Album cover"
                      className="object-cover"
                      height={400}
                      shadow="md"
                      src={pck.image}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-1 gap-4 ">
                    <h1 className="text-4xl text-center">{pck.name}</h1>
                    {pck.tagline && (
                      <p className="text-start font-sans text-sm italic text-gray-300">
                        {pck.tagline}
                      </p>
                    )}
                    {pck.bestFor && (
                      <p className="text-start font-sans">
                        Best For:{' '}
                        <span className="font-bold text-[#FFD700]">{pck.bestFor}</span>
                      </p>
                    )}
                    <p className="text-start font-sans">
                      Price of Package:{' '}
                      <span className="font-bold text-[#FFD700]">${pck.price}</span>
                    </p>
                    <p className="text-start font-sans">
                      Duration:{' '}
                      <span className="font-bold text-[#FFD700]">{pck.time}</span>
                    </p>
                    {pck.guestCapacity && (
                      <p className="text-start font-sans">
                        Guest Capacity:{' '}
                        <span className="font-bold text-[#FFD700]">{pck.guestCapacity}</span>
                        {pck.extraGuestFee && (
                          <span className="text-sm text-gray-400"> ({pck.extraGuestFee})</span>
                        )}
                      </p>
                    )}
                    {pck.extraTimeFee && (
                      <p className="text-start font-sans">
                        Extra Time:{' '}
                        <span className="font-bold text-[#FFD700]">{pck.extraTimeFee}</span>
                      </p>
                    )}
                    <ul className=" font-sans list-disc list-inside">
                      {pck.descriptions.map((description, index) => (
                        description ? (
                          <li key={index} className={`p-1 ${description.endsWith(':') ? 'font-semibold text-[#FFD700] list-none mt-3' : 'marker:text-[#FFD700]'}`}>
                            {description}
                          </li>
                        ) : (
                          <li key={index} className="list-none h-2"></li>
                        )
                      ))}
                    </ul>
                    <div className="flex justify-center mt-3 animate-pulse">
                      <Link href={'/booking'}>
                        <Button
                          className="bg-transparent border  rounded-sm border-[#DC143C] rounded-sm text-[#FFD700] hover:bg-[#DC143C] hover:animate-pulse"
                          variant="shadow"
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </PackageMotion>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
