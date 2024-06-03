'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { useTheme } from 'next-themes';

const Footer = () => {
  let { resolvedTheme } = useTheme();

  return (
    <footer className="">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:flex-col md:justify-center">
          <div className="mb-6 md:mb-0 flex justify-center align-center m-5">
            <a href="/" className="flex items-center">
              <Image
                src="/logo-white.png"
                className=" me-3 pb-5 h-[70px]"
                alt="FlowBite Logo"
                width={300}
                height={100}
              />
            </a>
          </div>
          <div className="flex justify-center mt-4 sm:justify-center sm:mt-0">
            <a
              href="https://www.facebook.com/story.php?story_fbid=7194571487328980&id=100003286008993&mibextid=WC7FNe&rdid=w9ZRwtbtRdW4CB6z"
              className="text-white hover:text-[#DC143C] dark:hover:text-[#FFD700]"
              aria-label="FaceBook"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="https://www.instagram.com/vidabebidasproject?igsh=MXc5bHB4cGlpdHN0NQ=="
              className="text-white hover:text-[#DC143C] dark:hover:text-[#FFD700] ms-5"
              target="_blank"
              aria-label="Instagram"
            >
              <span className="icon-[ph--instagram-logo-thin] text-lg"></span>
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex justify-center  ">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024
            <a
              href="https://www.osworld.dev/"
              className="hover:underline"
              target="_blank"
            >
              {' '}
              Created by{' '}
            </a>
            Oscar Leal
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
