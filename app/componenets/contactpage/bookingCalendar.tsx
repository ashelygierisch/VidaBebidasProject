import React from 'react'
import { Calendar } from "@/components/ui/calendar"
const BookingCalender = ({date, onDateChange}: any) => {
  
  //Fetch all dates that are booked
  //pass them into the disable property of calendar component to block those dates from being re booked


  // const bookedDates= ()=> {

  //   const res= await fetch('/api/')
  // }
  return (
    <div>
      <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={(e) => onDateChange(e)}
      disabled={{
        before: new Date(2025, 5, 12),
      }}
      className="rounded-lg border shadow-sm bg-white-600"
    />
    </div>
  )
}

export default BookingCalender
