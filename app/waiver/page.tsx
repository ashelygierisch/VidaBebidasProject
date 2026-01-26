'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardBody, Divider, Image } from '@nextui-org/react';

const WaiverForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const name = searchParams.get('name');

  
  const [electronicSignature, setElectronicSignature] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const bookingId = sessionStorage.getItem('bookingId'); //getting the booking ID from local storage

    const ClientBooking= sessionStorage.getItem('clientbookinginfo')

    
    console.log('Waiver Signed', electronicSignature, isChecked);

    if(ClientBooking){

      const bookingInfo=JSON.parse(ClientBooking)

      bookingInfo.confirmWaiver=isChecked
      bookingInfo.electronicSignature=electronicSignature

      if (electronicSignature === '') {
        toast.error('Please provide a Signature');
      } else {
      
        sessionStorage.setItem('clientbookinginfo', JSON.stringify(bookingInfo))
        router.push('/review');
      }
    }else{
      console.log('No Booking Data Found')
    }

  
  };

  return (
    <div className="mt-[100px] m-2">
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
      
            <p className="text-md font-bold">
              Waiver and Agreement for Bartending Services
            </p>
            
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {/* Booking Details Section */}
          <div className="mb-6">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold text-yellow-600 mb-4 text-center">
                Important Information
              </h3>
              <ul className="text-white space-y-4 text-base">
                <li className="p-2 border-b border-gray-600">
                  <span className="font-semibold text-lg text-yellow-600">
                    Host responsibility & Bartender provisions:
                  </span>{' '}
                  HOST PROVIDES LIQUOR IN ALL PACKAGES.
                  <div className="mt-2">$75.00 FOR EXTRA HOUR(S)</div>
                </li>
                <li className="p-2 border-b border-gray-600">
                  <span className="font-semibold text-lg text-yellow-600">
                    Deposits:
                  </span>
                  {'  '}
                  <span className="font-bold text-[#ff0000]">Non-Refundable</span>
                </li>
                <li className="p-2 border-b border-gray-600">
                  <span className="font-semibold text-lg text-yellow-600">
                    Driving Time Convenience:
                  </span>{' '}
                  <ul className="font-sans list-disc list-inside m-2">
                    <li className="p-1 marker:text-[#ff0000]">1hr ($20) </li>
                    <li className="p-1 marker:text-[#ff0000]">2hr ($40)</li>
                    <li className="p-1 marker:text-[#ff0000]">3hr($60)</li>
                  </ul>
                </li>
                <li className="p-2">
                  <span className="font-semibold text-lg text-yellow-600">
                    All packages:
                  </span>{' '}
                  100 people standard max, each additional person is $1 added.
                </li>
              </ul>
            </div>
          </div>

          <form
            className="max-w-lg mx-auto text-left border-1 rounded-lg "
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center">
              <div className="waiver-form">
           
                <p className="text-center text-[#FFD700] m-2">
                  Please review the booking information above and read and accept the waiver terms below to proceed with your
                  booking.
                </p>
                <div className="h-85 overflow-y-auto border border-gray-300 p-4 bg-white text-black">
                  <p className="m-3 font-serif ">
                    This Waiver and Agreement is made between
                    VidaBebidasProject/Michael Estrada (Bartender) and the
                    client booking, <span className='font-bold'>{name}</span>. By accepting this Agreement, the
                    Client acknowledges and agrees to the terms and conditions
                    set forth below.
                  </p>
                  <ul className="text-sm">
                    <li className="m-2">
                      <span className="font-bold underline ">
                        1. Host Responsibility:
                      </span>{' '}
                      are dependent on package selected & booking completion.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        2. Bartender Provisions:
                      </span>{' '}
                      are dependent on package selected & booking completion.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        {' '}
                        4. Budget Variations:
                      </span>{' '}
                      The Client acknowledges that the budget may vary based on
                      the choice of house liquor or upscale liquor. The Client
                      will be informed of any budget changes prior to the
                      procurement of the liquor by the Bartender.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        {' '}
                        5. Liability Waiver:
                      </span>{' '}
                      The Client agrees to indemnify and hold harmless Vida
                      Bebidas Project, its employees, and agents from any and
                      all claims, damages, losses, and expenses arising out of
                      or resulting from the services provided, except where such
                      claims are the result of gross negligence or willful
                      misconduct by the Bartender.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        {' '}
                        6. Age Verification:
                      </span>{' '}
                      The Client is responsible for ensuring that all guests
                      consuming alcoholic beverages are of legal drinking age.
                      The Bartender reserves the right to request identification
                      and refuse service to any guest without proper
                      identification.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        {' '}
                        7. Event Duration and Overtime:
                      </span>{' '}
                      The Bartender will provide services for the agreed-upon
                      duration of the event. Any additional time requested by
                      the Client beyond the initial agreement will be charged at
                      an overtime rate to be determined by the Bartender.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        {' '}
                        8. Cancellation Policy:
                      </span>{' '}
                      The Client must provide notice of cancellation at least
                      three days prior to the event.
                    </li>

                    <li className="m-2">
                      <span className="font-bold underline">
                        {' '}
                        9. Acceptance of Terms:
                      </span>{' '}
                      By accepting below, the Client acknowledges that they have
                      read, understood, and agreed to the terms and conditions
                      outlined in this Agreement. For any questions or concerns,
                      please contact Vida Bebidas Project at +1 (214-893-2926).
                    </li>
                  </ul>
                </div>
           
                <label className="block m-2">
                  Electronic Signature:
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1 mt-1"
                    value={electronicSignature}
                    onChange={(e) => setElectronicSignature(e.target.value)}
                  />
                </label>

                <label className="block m-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  I acknowledge and agree to the terms and conditions outlined
                  in this Bartending Services Waiver Form.
                </label>
                <div className="flex justify-center m-2">
                  <Button
                    type="submit"
                    className={`bg-[#DC143C] text-white px-4 py-2 rounded ${
                      isChecked
                        ? 'bg-green-400'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!isChecked}
                  >
                    Review Booking
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default WaiverForm;
