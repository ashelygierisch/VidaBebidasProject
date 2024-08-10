import React from 'react';
import { Motion } from '../componenets/aboutpage/motion';
import BookingModel from '../componenets/contactpage/form';
import BookingForm from '../componenets/contactpage/bookingform';
const Booking = () => {
  return (
    <div className="mt-[100px]">
      <Motion>
        <BookingForm />
      </Motion>
    </div>
  );
};

export default Booking;
