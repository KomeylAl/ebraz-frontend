import React from 'react'
import { GiRotaryPhone } from 'react-icons/gi'

const Topbar = () => {
  return (
    <div className='w-full px-8 py-4 border-[#c2c3f3] border bg-white shadow-sm rounded-2xl hidden md:flex items-center justify-between'>
      <div className=''>
         برای دریافت نوبت تماس بگیرید.
      </div>
      <div className='flex gap-2 justify-center'>
        <a href="tel:09228728245" className='hover:text-[#c2c3f3] transition duration-200'>09228728245</a> - 
        <a href="tel:03191095184" className='hover:text-[#c2c3f3] transition duration-200'>03191095184</a>
        <GiRotaryPhone size={20} className='text-[#c2c3f3]' />
      </div>
    </div>
  )
}

export default Topbar