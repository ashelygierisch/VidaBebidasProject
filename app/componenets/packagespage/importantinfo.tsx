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
const ImportantInfo = () => {
  return (
    <div>
      <h2 className="text-5xl text-[#FFFFF0] text-center m-5">Packages</h2>
      <Card className="w-50 h-50">
        <CardHeader className="flex gap-3">
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
          <ul className="font-sans list-disc list-inside">
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">Host Responsibility: </a>All liquor,
              beer, and beverages must be provided by the host.
            </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">Bartender Provisions: </a>I will supply
              lime juice, Tajín, salt, juice mixers, bartender materials, and
              exceptional service.
            </li>
          </ul>
          <p className="m-2 leading-7 text-start">
            For the <a className="font-bold text-[#FFD700]">Reposado Package</a>{' '}
            and <a className="font-bold text-[#FFD700]">Añejo Package</a>, it is
            highly recommended that the bartender procure the liquor to ensure
            all necessary ingredients are available for the event. Please be
            aware that the budget may vary based on the choice of house liquor
            or upscale liquor.
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          {/* <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImportantInfo;
