'use client'

import { useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const BookingCalendar = ({date, onDateChange, startTime, endTime, onStartDateChange, onEndDateChange}:any) => {
  const [open, setOpen] = useState(false)
//   const [date, setDate] = useState<Date | undefined>(undefined)

// const [startTime, setStartTime]=useState('01:30:00');
// const [endTime, setEndTime]=useState('02:30:00')


  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full max-w-xs flex-col gap-3'>
        <Label htmlFor='date' className='px-1'>
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' id='date' className='w-full justify-between font-normal text-white'>
              {date ? date.toLocaleDateString() : 'Pick a date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              mode='single'
              disabled={{ before: new Date() }}
              selected={date}
              onSelect={date => {
                onDateChange(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex gap-2 autoflow'>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='time-from' className='px-1'>
           Start Time
          </Label>
          <Input
            type='time'
            id='time-from'
            step='60'
            value={startTime}
            onChange={(e)=>onStartDateChange(e.target.value)}
         
            className='bg-background text-white appearance-none [&::-webkit-calendar-picker-indicator] [&::-webkit-calendar-picker-indicator]'
          />
        </div>
      </div>
    </div>
  )
}

export default BookingCalendar





  
  //Fetch all dates that are booked
  //pass them into the disable property of calendar component to block those dates from being re booked


  // const bookedDates= ()=> {

  //   const res= await fetch('/api/')
  // }