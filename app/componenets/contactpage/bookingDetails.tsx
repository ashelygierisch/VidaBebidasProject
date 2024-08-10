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
              <span className="font-semibold text-lg">Responsibility:</span> All
              liquor, beer, and beverages must be provided by the host.
            </li>
            <li className="p-2 border-b border-gray-200">
              <span className="font-semibold text-lg">
                Bartender Provisions:
              </span>{' '}
              I will supply lime juice, Tajín, salt, juice mixers, bartender
              materials, and exceptional service.
            </li>
            <li className="p-2 border-b border-gray-200">
              <span className="font-semibold text-lg">
                Package Recommendations:
              </span>{' '}
              For the Reposado Package and Añejo Package, it is highly
              recommended that the bartender procure the liquor to ensure all
              necessary ingredients are available for the event.
            </li>
            <li className="p-2">
              <span className="font-semibold text-lg">Budget Variations:</span>{' '}
              Please be aware that the budget may vary based on the choice of
              house liquor or upscale liquor.
            </li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookingDetails;
