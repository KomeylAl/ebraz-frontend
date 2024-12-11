"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import fa from "react-date-object/locales/persian_fa";
import { getCookie } from "cookies-next";

export const AppinmentsList = () => {
  const [appointments, setAppointments]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/appointments`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setAppointments(response.data);
      } else {
        console.log(response.data);
      }
    } catch (e: any) {
      console.log(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const getAppointmentbyDate: any = async (date: any) => {
    setValue(date);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/appointments/date/${date}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAppointments();
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
        <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
          <h2 className="font-bold text-xl">نوبت ها</h2>
          -
          <input
            type="text"
            placeholder="جستجو"
            className="px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex md:flex-row flex-col items-start gap-3">
          <DatePicker
            inputClass="px-4 py-2 bg-cyan-600 rounded-md text-white text-center placeholder-white"
            placeholder="انتخاب تاریخ"
            calendar={persian}
            locale={fa}
            value={value}
            format="YYYY-MM-DD"
            onChange={getAppointmentbyDate}
          />
          <div
            onClick={() => router.push("/admin/appointments/add")}
            className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer"
          >
            افزودن نوبت
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:max-h-[650px] max-h-[450px] h-fit pr-6 pl-2 mt-6">
        <div className="flex items-center 
           md:justify-between py-4 border-b 
           border-gray-200 overflow-x-scroll gap-28
           md:overflow-x-hidden
           md:gap-0">
          <div className="w-[5%] text-right font-bold">#</div>
          <div className="w-[15%] text-right font-bold">مراجع</div>
          <div className="w-[15%] text-right font-bold">پزشک</div>
          <div className="w-[15%] text-right font-bold">تاریخ و ساعت</div>
          <div className="w-[15%] text-right font-bold">وضعیت</div>
          <div className="w-[15%] text-right font-bold">مبلغ</div>
        </div>
        <div className="overflow-y-scroll overflow-x-scroll
           md:overflow-x-hidden">
          {appointments.map((appointment: any) => (
            <div
              key={appointment.referral_id}
              onClick={() =>
                router.push(`/admin/appointments/edit/${appointment.referral_id}`)
              }
              className="flex items-center md:justify-between gap-28 md:gap-0 py-4 hover:bg-gray-100 cursor-pointer"  
            >
              <div className="w-[5%] text-right">{appointment.referral_id}</div>
              <div className="w-[15%] text-right">{appointment.client}</div>
              <div className="w-[15%] text-right">{appointment.doctor}</div>
              <div className="w-[15%] text-right">
                {appointment.time} - {appointment.date}
              </div>
              <div
                className={`w-[15%] text-right ${
                  appointment.status === "pending"
                    ? "text-rose-500"
                    : "text-green-500"
                }`}
              >
                {appointment.status === "pending" ? "انجام نشده" : "انجام شده"}
              </div>
              <div
                className={`w-[15%] text-lg text-right ${
                  appointment.payment_status === "unpaid"
                    ? "text-amber-500"
                    : "text-sky-600"
                }`}
              >
                {appointment.payment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
