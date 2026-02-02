
"use client";
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function ConfettiAnimation() {
  const [isConfettiVisible, setIsConfettiVisible] = useState(true);  // Start as true
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setIsConfettiVisible(false);
    }, 9000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isConfettiVisible) return null;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={500}
      recycle={false}
    />
  );
}

export default ConfettiAnimation;