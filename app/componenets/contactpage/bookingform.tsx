'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { DateCalendar, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const BookingForm = () => {
  return (
    <div>
      <form className=" flex flex-col lg:justify-center justify-start lg:items-center gap-5 p-4 ">
        <div className="flex lg:flex-row flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2 text-sm">
            First Name
            <input type="text" className="grow" placeholder="Daisy" />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-sm">
            Last Name
            <input type="text" className="grow" placeholder="daisy@site.com" />
          </label>
        </div>
        <label className="input input-bordered flex items-center gap-2 w-auto text-sm">
          Email
          <input type="text" className="grow" placeholder="daisy@site.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto  text-sm h-auto ">
          Choice of Service
          <ul className="m-2 ">
            <li className="m-2">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                id="SilverPackage"
              />
              <label htmlFor="SilverPackage" className="text-sm p-2">
                SilverPackage ($150)
              </label>
            </li>
            <li className="m-2">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                id="ReposadoPackage"
              />
              <label htmlFor="ReposadoPackage" className="text-sm p-2">
                ReposadoPackage($200)
              </label>
            </li>
            <li className="m-2">
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                id="AñejoPackage"
              />
              <label htmlFor="AñejoPackage" className="text-sm p-2">
                AñejoPackage ($250)
              </label>
            </li>
          </ul>
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto text-sm">
          Address of Event
          <input
            type="text"
            className="grow"
            placeholder="1234 Mockingbird Lane, Dallas, TX 75209"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto text-sm">
          Phone Number
          <input type="text" className="grow" placeholder="469-768-6711" />
        </label>
        <label className="input input-bordered flex items-center gap-2 lg:w-auto  text-sm">
          Questions|Comments
          <input
            type="message"
            className="grow resize-none overflow-hidden"
            maxLength={200}
            placeholder="Do you go and get the liquor..?  "
          />
        </label>
      </form>
    </div>
  );
};

export default BookingForm;
