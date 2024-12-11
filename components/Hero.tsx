import Image from 'next/image'
import React from 'react'
import hero from '../app/images/hero.jpeg'

const Hero = () => {
  return (
    <div className='w-full flex'>
      <div className="w-full relative h-[500px] shadow-sm md:rounded-2xl">
        <Image
          src={hero}
          alt=''
          fill
          className='object-cover object-left xl:object-center md:rounded-2xl -z-10'
        />
        <div className='lg:hidden w-full h-full absolute z-0 bg-black bg-opacity-35 md:rounded-2xl' />
        <div className='w-full h-full flex flex-col absolute z-10 items-start justify-center gap-8 p-8'>
          <h1 className='text-[40px] font-bold text-white'>
            مرکز جامع مشاوره و رواندرمانی ابراز
          </h1>
          <p className='text-xl text-white'>
            با تاسیس و مدیریت دکتر علی محرابی، متخصص روانشناسی بالینی و عضو هیئت علمی دانشگاه اصفهان
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero