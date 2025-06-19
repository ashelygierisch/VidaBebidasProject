'use client';
import React from 'react';
import ScrollToTop from 'react-scroll-up';

const ScrollButton = () => {
  return (
    <div className="relative z-[300]">
      <ScrollToTop showUnder={160}>
        <span className="icon-[pajamas--scroll-up] text-3xl text-[#DC143C]"></span>
      </ScrollToTop>
    </div>
  );
  
};

export default ScrollButton;
