'use client';
import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black/30 border-t border-[#FFFFF0]/30">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src="/VB-Logo-2026.png"
              alt="Vidabebidasproject Logo"
              width={500}
              height={300}
              className="h-[150px] w-auto"
              priority
            />
          </Link>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.facebook.com/story.php?story_fbid=7194571487328980&id=100003286008993&mibextid=WC7FNe&rdid=w9ZRwtbtRdW4CB6z"
              className="text-white/80 hover:text-[#DC143C] transition-colors duration-300"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/vidabebidasproject?igsh=MXc5bHB4cGlpdHN0NQ=="
              className="text-white/80 hover:text-[#DC143C] transition-colors duration-300"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>

          {/* Navigation Links - Optional */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/70">
            <Link
              href="/about"
              className="hover:text-[#FFD700] transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/packages"
              className="hover:text-[#FFD700] transition-colors duration-300"
            >
              Packages
            </Link>
            <Link
              href="/booking"
              className="hover:text-[#FFD700] transition-colors duration-300"
            >
              Book Now
            </Link>
            <Link
              href="/reviews"
              className="hover:text-[#FFD700] transition-colors duration-300"
            >
              Reviews
            </Link>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#FFFFF0]/30 to-transparent" />

          {/* Copyright */}
          <div className="text-sm text-white/50">
            © 2024 Vidabebidasproject <span className="mx-2">•</span>
            <a
              href="https://www.osworld.dev/"
              className="hover:text-[#FFD700] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Created by Os World
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
