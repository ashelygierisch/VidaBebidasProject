import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react';
import NextLink from 'next/link';

const ImportantInfo = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-0">
      <h2 className="text-5xl text-[#FFD700] text-center m-5">Packages</h2>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex gap-3 justify-center">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://mikessite.s3.us-east-2.amazonaws.com/logo-tab.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md font-bold">Important Information</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Please note the following details before selecting a package:</p>
          
          {/* What's Included Section */}
          <div className="bg-gray-800 rounded-lg p-4 my-4">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">What&apos;s Included in Your Service</h3>
            <p className="text-sm text-gray-300 mb-3">
              Every event includes professional service backed by time, skill, responsibility, and experience.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[#FFD700]">●</span>
                <span>Set Up: 1 - 1.5 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FFD700]">●</span>
                <span>Service: 5 hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FFD700]">●</span>
                <span>Cleanup: 0.5 - 1 hr</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FFD700]">●</span>
                <span className="font-semibold">Total: ~7 hrs</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 italic">
              Your investment covers dedicated time, professional expertise, and a seamless bar experience from start to finish.
            </p>
          </div>

          <ul className="font-sans list-disc list-inside">
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">
                Host responsibility & Bartender provisions:
              </a>{' '}
              HOST PROVIDES LIQUOR IN ALL PACKAGES. 
            </li>
            <li className="p-1 marker:text-[#FFD700] border-b border-gray-600 flex-col">
           
                  <span className="font-semibold text-lg text-yellow-600">
                  Deposit Fee: 
                  </span>
                  {'  '}
                  <span className='text-green font-bold text-[#99ff00]'>$100  {'  '}</span>
                  <span className="font-bold text-[#ff0000]">(Non-Refundable)</span>
                </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">Driving Time Convenience: </a>
              <ul className="font-sans list-disc list-inside m-2">
                <li className="p-1 marker:text-[#ff0000]">1hr ($20) </li>
                <li className="p-1 marker:text-[#ff0000]">2hr ($40)</li>
                <li className="p-1 marker:text-[#ff0000]">3hr ($60)</li>
              </ul>
            </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">All packages:</a> Up to 75 guests included. 
              $1.00 per additional guest.
            </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">All packages:</a> $75.00 FOR EXTRA HOUR(S)
            </li>
          </ul>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center">
          <NextLink href="/faq" className="text-[#FFD700] hover:text-[#DC143C] underline transition-colors">
            Have questions? Check out our FAQ →
          </NextLink>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImportantInfo;
