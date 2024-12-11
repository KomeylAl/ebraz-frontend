'use client';

import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ClassesList = () => {
  const [classes, setClasses]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterdClasses, setFilterdClasses] = useState([]);

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const handleSearch = (event: any) => {
   const term = event.target.value;
   setSearchTerm(term);

   const filterd = classes.filter((classes: any) => 
     classes.title.includes(term)
   );

   setFilterdClasses(filterd);
 }

 useEffect(() => {
   setIsLoading(true);
   const getClasses = async () => {
     try {
       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/classes`, {
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
       });
 
       if (response.status === 401) {
         router.push("/login");
       }
 
       if (response.status == 200) {
         setClasses(response.data);
         setFilterdClasses(response.data);
       } else {
         console.log(response.data);
       }
     } catch (e: any) {
       console.log(e.toString());
     } finally {
       setIsLoading(false);
     }
   };
   getClasses();
 }, []);

 if (isLoading) {
   return (
     <div>
       <BeatLoader
         className="text-center mt-20 flex items-center justify-center"
         color={"#3fb2f2"}
         size={30}
       />
     </div>
   );
 }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-xl">کلاس ها</h2>
          -
          <input
            type="text"
            placeholder="جستجو"
            className="px-4 py-2 rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div
          onClick={() => router.push("/classes/add")}
          className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer"
        >
          افزودن کلاس
        </div>
      </div>
      <div className="w-full flex flex-col md:max-h-[650px] max-h-[450px] h-fit pr-6 pl-2 mt-6">
        <div
          className="flex items-center 
           md:justify-between py-4 border-b 
           border-gray-200 overflow-x-scroll gap-28
           md:overflow-x-hidden
           md:gap-0"
        >
          <div className="w-[5%] text-right text-sm md:font-bold">#</div>
          <div className="w-[15%] text-right text-sm md:font-bold">
            عنوان کلاس
          </div>
          <div className="w-[15%] text-right text-sm md:font-bold">
            تاریخ شروع
          </div>
          <div className="w-[15%] text-right text-sm md:font-bold">
            تاریخ پایان
          </div>
          <div className="w-[15%] text-right text-sm md:font-bold">روز برگزاری</div>
          <div className="w-[15%] text-right text-sm md:font-bold">ساعت</div>
        </div>
        <div
          className="overflow-y-scroll overflow-x-scroll
           md:overflow-x-hidden"
        >
          {filterdClasses.map((classes: any) => (
            <div
              key={classes.id}
              className="flex items-center md:justify-between py-4 gap-28 md:gap-0"
            >
              <div className="w-[5%] text-right">{classes.id}</div>
              <div className="w-[15%] text-right">{classes.title}</div>
              <div className="w-[15%] text-right">{classes.start_date}</div>
              <div className="w-[15%] text-right">{classes.end_date}</div>
              <div className="w-[15%] text-right">{classes.week_day}</div>
              <div className="w-[15%] text-right">{classes.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClassesList;
