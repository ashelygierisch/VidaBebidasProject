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

import {
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  Avatar,
  User,
} from '@nextui-org/react';

const Navigation = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Home', 'Packages', 'About', 'Contact'];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="navbar font-open bg-black text-white fixed z-20"
      isBordered
    >
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden " justify="center">
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/logo-white.png"
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
              src="/logo-white.png"
              alt="Logo"
              width={300}
              height="55"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4 " justify="center">
        <NavbarItem className="hover:text-[#DC143C]">
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-[#DC143C]">
          <Link href="/packages" aria-current="page">
            Packages
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-[#DC143C]">
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className="hover:text-[#DC143C]">
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex sm:flex gap-4">
          <div className="flex items-center gap-4">
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
                  <p className="font-bold">Bartender Servicing DFW</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <p className="">
                    <span className="icon-[mdi--email]"></span>
                    {'   '}
                    <a
                      href="mailto:saludos@vidabebidasproject.com"
                      className="m-2"
                    >
                      saludos@vidabebidasproject.com
                    </a>
                  </p>
                </DropdownItem>
                <DropdownItem key="phone number" className="flex ">
                  <p>
                    <span className="icon-[material-symbols--phone-forwarded] inline-block"></span>
                    {'   '}
                    <a href="tel:214-809-7270" className="text-white m-2">
                      +1 (214-893-2926)
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
