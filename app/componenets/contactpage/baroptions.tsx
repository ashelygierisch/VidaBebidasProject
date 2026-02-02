'use client'
import React from 'react'

const BarOptions = ({barOption, onBarOptionChange}:any) => {

    const baroptions=["Yes — a bar will already be set up", "No — a bar setup will be needed", "Not sure yet"]

    
  return (
   <div>
      <label className="flex flex-col gap-2 text-sm text-gray-700">
          Bar Setup
          <h3 className='indent-1 text-gray-900 font-bold '>Will there be a dedicated bar space available at the event?</h3>
          <ul className="flex flex-col gap-2">
            {baroptions.map((baroption,index)  => (

              <li className="flex items-center gap-2" key={index}>
                <input
                      type="radio"
                      name="baroption"
                      className="radio radio-warning"
                      id={`baroption-${index}`} 
                      value={baroption}
                      checked={barOption === baroption}
                      onChange={(e) => onBarOptionChange(e.target.value)}
                />
                <label htmlFor={`baroption-${index}`}  className="text-sm">
                  {baroption}
                </label>
              </li>

            ))}
          </ul>
        </label>
    </div>
  )
}

export default BarOptions
