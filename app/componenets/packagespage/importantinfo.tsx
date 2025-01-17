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
      <h2 className="text-5xl text-[#FFD700] text-center m-5">Packages</h2>
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
          <p>Please note the following details before selecting a package:</p>
          <ul className="font-sans list-disc list-inside">
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">
                Host responsibility & Bartender provisions:
              </a>{' '}
              are dependent on package selected & booking completion between
              Bartender & Customer.
            </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">Deposits: </a>
              <span className="font-bold text-[#ff0000]">Non-Refundable</span>
            </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">Driving Time Convenience: </a>
              <ul className="font-sans list-disc list-inside m-2">
                <li className="p-1 marker:text-[#ff0000]">1hr ($20) </li>
                <li className="p-1 marker:text-[#ff0000]">2hr ($40)</li>
                <li className="p-1 marker:text-[#ff0000]">3hr($60)</li>
              </ul>
            </li>
            <li className="p-1 marker:text-[#FFD700]">
              <a className="font-bold">All packages:</a> 100 people standard
              max, each additional person is $1 added.
            </li>
          </ul>
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
