import React from 'react'
import Item from './Item'
import dep1 from '../app/images/dep-1.jpg'
import dep2 from '../app/images/dep-2.jpg'
import dep3 from '../app/images/dep-3.jpg'
import dep4 from '../app/images/dep-4.jpg'
import dep5 from '../app/images/dep-5.jpg'
import dep6 from '../app/images/dep-6.jpg'
import dep7 from '../app/images/dep-7.jpg'
import dep8 from '../app/images/dep-8.webp'

const departments = [
   {
      'title' : 'رواندرمانی فردی (بالینی و سلامت)',
      'image' : dep1,
   },
   {
      'title' : 'زوج درمانی و خانواده درمانی',
      'image' : dep2,
   },
   {
      'title' : 'گروه درمانی',
      'image' : dep3,
   },
   {
      'title' : 'بازی درمانی',
      'image' : dep4
   },
   {
      'title' : 'درمان سوگ و تروما',
      'image' : dep5
   },
   {
      'title' : 'هنر درمانی',
      'image' : dep6
   },
   {
      'title' : 'درمان عصبی (نوروتراپی)',
      'image' : dep7
   },
   {
      'title' : 'مشاوره های تحصیلی، شغلی و سازمانی',
      'image' : dep8
   }
]

const Departments = () => {
  return (
    <div className='w-full p-9 md:p-0 flex flex-col items-right gap-4 mt-20'>
      <div className='flex flex-col gap-3 text-right w-full'>
         <h2 className='font-semibold text-2xl'>دپارتمان های کلینیک ابراز</h2>
         <p className=''>
            دپارتمان های تخصصی مرکز مشاوره و رواندرمانی ابراز
         </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
         {departments.map((dep) => (
            <Item key={dep.title} title={dep.title} image={dep.image} />
         ))}
      </div>
    </div>
  )
}

export default Departments