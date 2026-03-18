'use client'

import React, {useState} from 'react'

const SourceList = ( {source, onSourceChange}: any) => {

    const options=['INSTAGRAM','REFERRAL', 'VENUE', 'WEBSITE', 'PROMOTION' ]




  return (
    <div role="group" aria-required="true" aria-labelledby="source-label">
      <label id="source-label" className="flex flex-col gap-2 text-sm text-gray-700">
          <span className="inline-flex items-baseline gap-0.5">How did you hear about us?<span className="text-red-500 text-[0.75em] ml-0.5" aria-hidden="true">*</span></span>
          <ul className="flex flex-col gap-2">
            {options.map((option,index)  => (

              <li className="flex items-center gap-2" key={index}>
                <input
                      type="radio"
                      name="source"
                      className="radio radio-warning"
                      id={`sourceid-${index}`} 
                      value={option}
                      checked={source === option}
                      onChange={(e) => onSourceChange(e.target.value)}
                />
                <label htmlFor={`sourceid-${index}`}  className="text-sm">
                  {option}
                </label>
              </li>

            ))}
          </ul>
        </label>
    </div>
  )
}

export default SourceList
