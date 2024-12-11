import React from 'react'

const Blog = () => {
  return (
    <div className='mt-28 p-9 md:p-0 flex flex-col items-start gap-2 w-full'>
      <div className='flex flex-col gap-3 text-right w-full'>
         <h2 className='font-semibold text-2xl'>وبلاگ کلینیک ابراز</h2>
         <p className=''>
            مطالب مرکز ابراز رو از دست ندین
         </p>
      </div>
      <div className='felx items-center justify-between w-full h-[400px]'>
         هنوز مطلبی نیست!
      </div>
    </div>
  )
}

export default Blog