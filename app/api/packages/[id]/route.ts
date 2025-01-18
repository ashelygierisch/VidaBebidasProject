import { NextResponse } from 'next/server';

const packages = [
  {
    id: 1,
    name: 'Silver Package',
    image: 'https://mikessite.s3.us-east-2.amazonaws.com/SilverPic.webp',
    price: '250',
    time: '1-6 Hours',
    descriptions: ['Service package:', 'Service/Bar materials- ice'],
  },
  {
    id: 2,
    name: 'Reposado Package',
    image: 'https://mikessite.s3.us-east-2.amazonaws.com/ReposadoPic.webp',
    price: '325',
    time: '1-6 Hours',
    descriptions: [
      'Set Menu Package: ',
      'Service/Bar materials - ice, cups, straws, tajin',
      '2 cocktails',
      '2 classic drinks',
      '1 mixed shot',
      'Table set up if needed',
    ],
  },
  {
    id: 3,
    name: 'Añejo Package',
    image: 'https://mikessite.s3.us-east-2.amazonaws.com/AnejoPic.webp',
    price: '400',
    time: '1-5 Hours',
    descriptions: [
      'Open Bar package:',
      'Service/bar materials - ice, cups, straws, tajin, mixers, garnishes',
      '3 cocktails',
      '4 classic drinks',
      '2 mixed shots',
      'Table set up if needed',
    ],
  },
];

export const GET = async (request: Request, context: any) => {
  const { params } = context;

  return NextResponse.json({
    pck: packages.find((x: any) => x.id.toString() === params.id),
    headers: { 'Cache-Control': 'no-store' },
  });
};
