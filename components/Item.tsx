import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface ItemProps {
   title: string,
   image: string | StaticImageData
}

const Item = ({ title, image } : ItemProps) => {
  return (
    <div className='flex items-center gap-3 h-32 rounded-lg border-[#c2c3f3] border p-2'>
      <div className='w-28 h-28'>
         <Image 
            src={image}
            alt={title}
            className='w-full h-full object-cover rounded-lg'
         />
      </div>
      <p className='twxt-lg font-semibold'>
         {title}
      </p>
    </div>
  )
}

export default Item