import Image from 'next/image'
import React from 'react'
import logo from '../app/images/logo.png'

const About = () => {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row items-center justify-between mt-8 gap-16 p-9 md:p-0'>
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold text-2xl'>درباره کلینیک ابراز</h2>
        <p className='text-justify lg:text-lg'>
          مرکز جامع مشاوره و رواندرمانی ابراز (با تاسیس و مدیریت دکتر علی محرابی، متخصص روانشناسی بالینی و عضو هیئت علمی دانشگاه اصفهان)<br />
          دارای دپارتمان های تخصصی رواندرمانی فردی (بالینی و سلامت)، زوج درمانی و خانواده درمانی، گروه درمانی، بازی درمانی، درمان سوگ و تروما، هنردرمانی، درمان عصبی (نوروتراپی) و مشاوره های تحصیلی، شغلی و سازمانی.<br />
          با امکان برگزاری جلسات به هر دو صورت حضوری و آنلاین (به ویژه برای مراجعین سایر شهرها و خارج از کشور)<br />
          دارای آکادمی آموزش های تخصصی روانشناسی و تربیت رواندرمانگر
        </p>
      </div>
      <div>
        <Image
          src={logo}
          alt=''
          className='w-32 md:w-64 lg:w-64'
        />
      </div>
    </div>
  )
}

export default About