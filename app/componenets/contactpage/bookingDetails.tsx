import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
const BookingDetails = () => {
  return (
    <div className="flex justify-center my-3 bg-white rounded-lg">
      <Card className="border-none rounded-lg max-w-[610px] bg-white shadow-lg  p-6">
        <ul className="text-black space-y-4 text-base">
          <li className="p-2 border-b border-gray-200">
            <span className="font-semibold text-lg">Responsibility:</span> All
            liquor, beer, and beverages must be provided by the host.
          </li>
          <li className="p-2 border-b border-gray-200">
            <span className="font-semibold text-lg">Bartender Provisions:</span>{' '}
            I will supply lime juice, Tajín, salt, juice mixers, bartender
            materials, and exceptional service.
          </li>
          <li className="p-2 border-b border-gray-200">
            <span className="font-semibold text-lg">
              Package Recommendations:
            </span>{' '}
            For the Reposado Package and Añejo Package, it is highly recommended
            that the bartender procure the liquor to ensure all necessary
            ingredients are available for the event.
          </li>
          <li className="p-2">
            <span className="font-semibold text-lg">Budget Variations:</span>{' '}
            Please be aware that the budget may vary based on the choice of
            house liquor or upscale liquor.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default BookingDetails;
