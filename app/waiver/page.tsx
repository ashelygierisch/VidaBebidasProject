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

  useEffect(() => {
    console.log('Email:', email);
    console.log('Name:', name);
  }, [email, name]);
  const [fullName, setFullName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const bookingId = sessionStorage.getItem('bookingId'); //getting the booking ID from local storage

    if (!bookingId) {
      toast.error('Booking ID not found');
      return;
    }

    const response = await fetch('api/waiver', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        isChecked,
        email,
        bookingId, //Passing it into the API to fetch the booking details in the route to pass to nodemailer to send to client and customer
      }),
    });

    console.log('Form Submitted', fullName, isChecked);
    console.log('Post response', response);
    if (fullName === '') {
      toast.error('Please provide a Signature');
    } else {
      toast.success('Waiver Accepted and Booking Successful!');
      router.push('/thankyou');
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
          <form
            className="max-w-lg mx-auto text-left border-1 rounded-lg "
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center">
              <div className="waiver-form">
                <p className="text-center text-[#FFD700] m-2">
                  Please read and accept the waiver terms to proceed with your
                  booking.
                </p>
                <div className="h-85 overflow-y-auto border border-gray-300 p-4 bg-white text-black">
                  <p className="m-3 font-serif ">
                    This Waiver and Agreement is made between
                    VidaBebidasProject/Michael Estrada (Bartender) and the
                    client booking, {name}. By accepting this Agreement, the
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    Complete Booking
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
