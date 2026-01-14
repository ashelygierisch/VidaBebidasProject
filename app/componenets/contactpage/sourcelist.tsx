'use client'

import React, {useState} from 'react'

const SourceList = ( {source, onSourceChange}: any) => {

    const options=['INSTAGRAM','REFERRAL', 'VENUE', 'WEBSITE', 'PROMOTION' ]

    const id = `source-${options.indexOf}`


  return (
    <div>
      <label className="flex flex-col gap-2 text-sm text-gray-700">
          How Did you hear about us
          <ul className="flex flex-col gap-2">
            {options.map((option,index)  => (

              <li className="flex items-center gap-2" key={index}>
                <input
                      type="radio"
                      name="source"
                      className="radio radio-warning"
                      id={id}
                      value={option}
                      checked={source === option}
                      onChange={(e) => onSourceChange(e.target.value)}
                />
                <label htmlFor="socila handle" className="text-sm">
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
