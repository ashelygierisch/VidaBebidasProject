import { NextResponse } from 'next/server';

const packages: any = [
  {
    id: 1,
    name: 'Silver Package',
    image:
      'https://images.pexels.com/photos/1089932/pexels-photo-1089932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 150,
    description:
      "Serving choice of beer. Providing an assortment of beverages including Coke, Sprite, water, and more. Offering straight or chilled shots, garnished with salt or Tajín. Crafting classic mixed drinks such as Crown and Sprite, Buchanan's and Pineapple, Tequila and Soda, and more.",
  },
  {
    id: 2,
    name: 'Reposado Package',
    image:
      'https://images.pexels.com/photos/4667040/pexels-photo-4667040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 200,
    description:
      "Serving beers, either dressed with salt/Tajín or with a michelada setup. Providing an assortment of beverages including Coke, Sprite, water, and more. Offering straight or chilled shots, garnished with salt or Tajín. Crafting classic mixed drinks such as Crown and Sprite, Buchanan's and Pineapple, Tequila and Soda, and more. Preparing three custom mixed shots of your choice, including Green Teas, White Teas, Vegas Bombs, Mexican Candy, Lemon Drops, and more. Creating one cocktail with fresh lime juice, with options including Palomas, Pineapple Margaritas, Strawberry/Mango Margaritas, and more.",
  },
  {
    id: 3,
    name: 'Añejo Package',
    image:
      'https://images.pexels.com/photos/340996/pexels-photo-340996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 250,
    description:
      'Serving beers with either a michelada setup or dressed with salt.Providing an assortment of beverages including Coke, Sprite, water, and more.Offering straight or chilled shots, garnished with salt or Tajín. Crafting classic mixed drinks such as Crown and Sprite, Buchanans and Pineapple, Tequila and Soda, and more.Preparing four custom mixed shots of your choice, including Green Teas, White Teas, Vegas Bombs, Mexican Candy, Lemon Drops, and more.Creating three cocktails with fresh lime juice, with options including Ranch Waters, Grapefruit or Watermelon Palomas, Pineapple Margaritas, Strawberry or Mango Margaritas, Classic Lime Margaritas, Flavored Lemon Drop Drinks, Old Fashioneds, Whiskey Sours, and more.',
  },
];

export const GET = async (request: Request, context: any) => {
  const { params } = context;

  return NextResponse.json({
    pck: packages.find((x: any) => x.id.toString() === params.id),
  });
};
