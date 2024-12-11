"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const DoctorsList = () => {
  const [doctors, setDoctors]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const getDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        setDoctors(response.data);
      } else {
        console.log(response.data);
      }
    } catch (e: any) {
      console.log(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDoctors();
  }, []);

  const handleDelete = async (doctorId: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/doctors/${doctorId}`);
    } catch (error: any) {
      console.log(error.toString());
    }
    getDoctors();
  };

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
    <div className="w-full flex flex-col md:max-h-[650px] max-h-[450px] h-fit pr-6 pl-2 mt-6">
      <div className="flex items-center justify-between py-4 border-b border-gray-200 overflow-x-scroll gap-28
            md:overflow-x-hidden
            md:gap-0">
        <div className="w-[5%] text-right font-bold">#</div>
        <div className="w-[15%] text-right font-bold">نام و نام خانوادگی</div>
        <div className="w-[15%] text-right font-bold">شاره تلفن</div>
        <div className="w-[15%] text-right font-bold">تاریخ تولد</div>
        <div className="w-[15%] text-right font-bold">ویرایش</div>
        <div className="w-[15%] text-right font-bold">حذف</div>
      </div>
      <div className="overflow-y-scroll overflow-x-scroll
            md:overflow-x-hidden">
        {doctors.map((doctor: any) => (
          <div
            key={doctor.id}
            className="flex items-center justify-between py-4 gap-28 md:gap-0"
          >
            <div className="w-[5%] text-right">{doctor.id}</div>
            <div className="w-[15%] text-right">{doctor.name}</div>
            <div className="w-[15%] text-right">{doctor.phone}</div>
            <div className="w-[15%] text-right">{doctor.birth_date}</div>
            <div className="w-[15%] text-right">
              <div
                onClick={() => router.push(`/admin/doctors/edit/${doctor.id}`)}
                className="px-4 py-1 rounded-full text-white text-center text-sm cursor-pointer bg-orange-500 w-fit"
              >
                ویرایش
              </div>
            </div>
            <div className="w-[15%] text-right">
              <div
                onClick={() => handleDelete(doctor.id)}
                className="px-4 py-1 rounded-full text-white text-center text-sm cursor-pointer bg-red-500 w-fit"
              >
                حذف
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
