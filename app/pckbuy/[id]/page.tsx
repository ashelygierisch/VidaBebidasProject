import GoogleForm from '@/app/componenets/contactpage/form';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';

// type Package = {
//   image: string;
//   name: string;
//   price: number;
//   descriptions: string[];
// };

async function getPackagebyId(pckId: string) {
  const response = await fetch(
    `https://vida-bebidas-project.vercel.app/api/packages/${pckId}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );

  return response.json();
}

export default async function PackageID({ params }: any) {
  const { pck } = await getPackagebyId(params.id);

  console.log(pck);

  return (
    <div className="mt-[100px]">
      <div className="flex justify-center items-center m-10">
        <GoogleForm />
      </div>
      <div className="flex lg:flex-nowrap flex-wrap text-start">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 w-65"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-1">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={pck.image}
                  width="100%"
                />
              </div>
              <div className="flex flex-col col-span-1 gap-4">
                <h1 className="text-4xl text-center">{pck.name}</h1>
                <p className="text-start font-sans">
                  Price of Package:{' '}
                  <a className="font-bold text-[#FFD700]">${pck.price}</a>
                </p>

                <ul className="font-sans list-disc list-inside">
                  <li className="p-1 marker:text-[#FFD700]">
                    {pck.description}
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
