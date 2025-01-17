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
const BookingDetails = () => {
  return (
    <div className="flex justify-center my-3rounded-lg">
      <Card className="w-50 h-50">
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
          <ul className="text-white space-y-4 text-base">
            <li className="p-2 border-b border-gray-200">
              <span className="font-semibold text-lg text-yellow-600">
                {' '}
                Host responsibility & Bartender provisions:
              </span>{' '}
              are dependent on package selected & booking completion.
            </li>
            <li className="p-2 border-b border-gray-200">
              <span className="font-semibold text-lg text-yellow-600">
                Deposits:
              </span>
              {'  '}
              <span className="font-bold text-[#ff0000]">Non-Refundable</span>
            </li>
            <li className="p-2 border-b border-gray-200">
              <span className="font-semibold text-lg text-yellow-600">
                Driving Time Convenience:
              </span>{' '}
              <ul className="font-sans list-disc list-inside m-2">
                <li className="p-1 marker:text-[#ff0000]">1hr ($20) </li>
                <li className="p-1 marker:text-[#ff0000]">2hr ($40)</li>
                <li className="p-1 marker:text-[#ff0000]">3hr($60)</li>
              </ul>
            </li>
            <li className="p-2 ">
              <span className="font-semibold text-lg text-yellow-600">
                All packages:
              </span>{' '}
              100 people standard max, each additional person is $1 added.
            </li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingDetails;
