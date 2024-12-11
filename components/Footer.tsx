import Image from 'next/image'
import React from 'react'
import office1 from '../app/images/office-1.jpg'
import logow from '@/app/images/logo-w.png'
import { BiMapPin, BiMobile, BiPhone } from 'react-icons/bi'

const Footer = () => {
  return (
    <footer className='w-full flex flex-col gap-4 items-center p-9 md:p-0'>
      <div className='h-[800px] lg:h-[400px] w-full text-white rounded-2xl shadow-xl'>
        <div className="w-full relative h-full shadow-sm rounded-2xl">
          <Image
            src={office1}
            alt=''
            fill
            className='object-cover object-left xl:object-center rounded-2xl -z-10'
          />
          <div className='w-full h-full absolute z-0 bg-black bg-opacity-70 rounded-2xl' />
          <div className='w-full h-full flex flex-col lg:flex-row absolute z-10 items-center justify-evenly gap-8 p-8'>
            <div className='flex flex-col gap-3'>
              <h2 className='text-2xl'>کلینیک تخصصی مشاوره و روان درمانی ابراز</h2>
              <p className=''>
              با تاسیس و مدیریت دکتر علی محرابی، متخصص روانشناسی بالینی و عضو هیئت علمی دانشگاه اصفهان
              </p>
              <div className='flex gap-2 mt-6 items-center'>
                <BiMapPin size={30} /> <p>اصفهان، خ هزارجریب، خ آزادی یا کلینی (مرداویج)، خ ملاصدرای جنوبی، بن بست شاهد، پلاک ۹</p>
              </div>
              <div className='flex gap-2 mt-6 items-center'>
                <BiPhone size={30} /> <p>03191095184 - 03191093136 - 03136680262 - 03136680290</p>
              </div>
              <div className='flex gap-2 mt-6 items-center'>
                <BiMobile size={30} /> <p>09228728245</p>
              </div>
            </div>
            <div>
              <Image 
                src={logow}
                alt=''
                className='w-32'
              />
            </div>
          </div>
        </div>
      </div>  
      <p className='text-center'>تمامی حقوق برای کلینیک ابراز محفوظ است. طراحی وب سایت کلینیک ابراز - <span className='hover:text-amber-600'><a href="">آژانس میقات</a></span></p>
    </footer>
  )
}

export default Footer