'use client';
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';
import React, { useState } from 'react';
import Link from 'next/link';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { useActivePath } from './helper';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  Avatar,
  User,
} from '@nextui-org/react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const checkActivePath = useActivePath();
  
  // Hide navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const menuItems = ['Home', 'Packages', 'FAQ', 'About', 'Booking'];

  const homeMenuItems = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="navbar font-open bg-black text-white fixed z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
      isBordered
    >
      <div className="absolute top-0 left-0">
        <span
          className={
            isMenuOpen
              ? 'clickmeicon icon-[game-icons--click] text-xl text-white animate-pulse hidden'
              : 'clickmeicon icon-[game-icons--click] text-xl text-white animate-pulse '
          }
        ></span>
      </div>
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/VB-Logo-2026.png"
              alt="Logo"
              width={150}
              height="55"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand className="hidden lg:flex">
          <Link href="/">
            <Image
              src="/VB-Logo-2026.png"
              alt="Logo"
              width={150}
              height="55"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {homeMenuItems.map((item) => (
          <NavbarItem
            key={item.path}
            className={
              checkActivePath(item.path)
                ? 'text-[#DC143C] border-b-1 border-yellow font-bold'
                : 'hover:text-[#FFD700] hover:animate-pulse'
            }
          >
            <Link href={item.path}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="lg:flex sm:flex gap-4">
          <div className="flex items-center gap-4 relative">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: 'https://mikessite.s3.us-east-2.amazonaws.com/IMG_0989.JPEG',
                  }}
                  className="transition-transform"
                  description="Mobile Bartender"
                  name="Michael Estrada"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2 text-center">
                  <p className="font-bold">Servicing DFW</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <p className="">
                    <span className="icon-[mdi--email] text-blue-300"></span>
                    {'   '}
                    <a
                      href="mailto:vidabebidasproject@outlook.com"
                      className="m-2 text-white hover:text-blue-300"
                    >
                      vidabebidasproject@outlook.com
                    </a>
                  </p>
                </DropdownItem>
                <DropdownItem key="phone number" className="flex">
                  <p>
                    <span className="icon-[material-symbols--phone-forwarded] inline-block"></span>
                    {'   '}
                    <a href="tel:214-893-2926" className="text-white m-2">
                      +1 (214-893-2926)
                    </a>
                  </p>
                </DropdownItem>
                <DropdownItem className="flex">
                  <p>
                    <span className="icon-[simple-icons--cashapp] inline-block text-green-500"></span>
                    {'   '}
                    <a
                      href="https://cash.app/$Mikeee214"
                      className="text-white hover:text-green-500 m-2"
                      target="_blank"
                    >
                      $ Cash App $
                    </a>
                  </p>
                </DropdownItem>
                <DropdownItem className="flex">
                  <p>
                    <span className="icon-[simple-icons--zelle] inline-block text-purple-500">
                      {' '}
                    </span>
                    {'   '}
                    <a
                      href="https://www.zellepay.com/go/zelle"
                      className=" m-2 text-white hover:text-purple-500"
                      target="_blank"
                    >
                      Zelle : +1 (214-893-2926)
                    </a>
                  </p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex items-center justify-center hover:border-[#DC143C]">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            onClick={() => setIsMenuOpen(false)}
            className="hover:border-[#FFD700]"
          >
            {item === 'Home' ? (
              <Link href="/" as="/">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.75,
                    delay: 0.25,
                  }}
                  className="p-2 border-b hover:border-[#DC143C]"
                >
                  {item}
                </motion.div>
              </Link>
            ) : (
              <Link
                className="w-full"
                color={
                  index === 3
                    ? 'warning'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href={`/${item.toLowerCase()}`}
              >
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.75,
                    delay: 0.25,
                  }}
                  className="p-2 border-b hover:border-[#DC143C] text-white"
                >
                  {item}
                </motion.div>
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
