'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
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
    const response = await fetch('api/waiver', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        isChecked,
        email,
      }),
    });

    console.log('Form Submitted', fullName, isChecked);

    toast.success('Waiver Accepted and Booking Successful!');
    router.push('/thankyou'); // Redirect to a thank you page or another page
  };

  return (
    <div className="mt-[100px] m-2">
      <form
        className="max-w-lg mx-auto text-left border-1 rounded-lg "
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <div className="waiver-form">
            <h1 className="font-bold text-2xl text-center m-2">
              {' '}
              Waiver and Agreement for Bartending Services
            </h1>
            <p className="text-center text-[#FFD700] m-2">
              Please read and accept the waiver terms to proceed with your
              booking.
            </p>
            <div className="h-85 overflow-y-auto border border-gray-300 p-4 bg-white text-black">
              <p className="m-3 font-serif ">
                This Waiver and Agreement is made between
                VidaBebidasProject/Michael Estrada ("Bartender") and the client
                booking, {name}. By accepting this Agreement, the Client
                acknowledges and agrees to the terms and conditions set forth
                below.
              </p>
              <ul className="text-sm">
                <li className="m-2">
                  <span className="font-bold underline ">
                    1. Host Responsibility:
                  </span>{' '}
                  The Client understands and agrees that all liquor, beer, and
                  beverages must be provided by the host. The Bartender is not
                  responsible for providing alcoholic beverages unless specified
                  in the package.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    2. Bartender Provisions:
                  </span>{' '}
                  The Bartender will supply lime juice, Tajín, salt, juice
                  mixers, bartender materials, and exceptional service to ensure
                  a memorable experience.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    {' '}
                    3. Package Recommendations:
                  </span>{' '}
                  For the Reposado Package and Añejo Package, it is highly
                  recommended that the Bartender procure the liquor to ensure
                  all necessary ingredients are available for the event. This
                  ensures the highest quality and availability of necessary
                  ingredients.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    {' '}
                    4. Budget Variations:
                  </span>{' '}
                  The Client acknowledges that the budget may vary based on the
                  choice of house liquor or upscale liquor. The Client will be
                  informed of any budget changes prior to the procurement of the
                  liquor by the Bartender.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    {' '}
                    5. Liability Waiver:
                  </span>{' '}
                  The Client agrees to indemnify and hold harmless Vida Bebidas
                  Project, its employees, and agents from any and all claims,
                  damages, losses, and expenses arising out of or resulting from
                  the services provided, except where such claims are the result
                  of gross negligence or willful misconduct by the Bartender.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    {' '}
                    6. Age Verification:
                  </span>{' '}
                  The Client is responsible for ensuring that all guests
                  consuming alcoholic beverages are of legal drinking age. The
                  Bartender reserves the right to request identification and
                  refuse service to any guest without proper identification.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    {' '}
                    7. Event Duration and Overtime:
                  </span>{' '}
                  The Bartender will provide services for the agreed-upon
                  duration of the event. Any additional time requested by the
                  Client beyond the initial agreement will be charged at an
                  overtime rate to be determined by the Bartender.
                </li>

                <li className="m-2">
                  <span className="font-bold underline">
                    {' '}
                    8. Cancellation Policy:
                  </span>{' '}
                  The Client must provide notice of cancellation at least three
                  days prior to the event.
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
              I acknowledge and agree to the terms and conditions outlined in
              this Bartending Services Waiver Form.
            </label>
            <div className="flex justify-center m-2">
              <Button
                type="submit"
                className={`bg-orange-500 text-white px-4 py-2 rounded ${
                  isChecked
                    ? 'hover:bg-orange-600'
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
    </div>
  );
};

export default WaiverForm;
