'use client'
import React from 'react'
import {Select}  from "@radix-ui/themes"; 

const VenueType = ({venueType,  onVenueChangeType}: any) => {
  return (
    <div className='text-black'>
      <Select.Root  value={venueType} onValueChange={(value)=>onVenueChangeType(value)}>
      <Select.Trigger color="orange" variant="classic" />
	<Select.Content color="orange">
		
			<Select.Item value="Wedding" >Wedding</Select.Item>
            <Select.Item value="Birthday">Birthday</Select.Item>
			<Select.Item value="Graduation">Graduation</Select.Item>
			<Select.Item value="Corporate Event" >
				Corporate Event
			</Select.Item>
            <Select.Item value="Private Event">Private Event</Select.Item>
			<Select.Item value="Other" >
				Other
			</Select.Item>
		
	</Select.Content>
</Select.Root>

    </div>
  )
}

export default VenueType
