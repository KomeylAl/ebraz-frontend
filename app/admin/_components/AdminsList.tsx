"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export const AdminsList = () => {
  const [admins, setAdmins]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const getAdmins = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.code);

      if (response.status === 401) {
        console.log("hhdiuhf");
        router.push("/login");
      }

      if (response.status == 200) {
        setAdmins(response.data);
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
    getAdmins();
  }, []);

  const handleDelete = async (adminId: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admins/${adminId}`);
    } catch (error: any) {
      console.log(error.toString());
    }
    getAdmins();
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
      <div
        className="flex items-center 
           md:justify-between py-4 border-b 
           border-gray-200 overflow-x-scroll gap-28
           md:overflow-x-hidden
           md:gap-0"
      >
        <div className="w-1/6 text-right font-bold">#</div>
        <div className="w-1/6 text-right font-bold">نام و نام خانوادگی</div>
        <div className="w-1/6 text-right font-bold">شاره شناسایی</div>
        <div className="w-1/6 text-right font-bold">تاریخ تولد</div>
        <div className="w-1/6 text-right font-bold">ویرایش</div>
        <div className="w-1/6 text-right font-bold">حذف</div>
      </div>
      <div
        className="overflow-y-scroll overflow-x-scroll
           md:overflow-x-hidden"
      >
        {admins.map((admin: any) => (
          <div
            key={admin.id}
            className="flex items-center md:justify-between py-4 gap-28 md:gap-0"
          >
            <div className="w-1/6 text-right">{admin.id}</div>
            <div className="w-1/6 text-right">{admin.name}</div>
            <div className="w-1/6 text-right">{admin.national_code}</div>
            <div className="w-1/6 text-right">{admin.birth_date}</div>
            <div className="w-1/6 text-right">
              <div
                onClick={() => router.push(`/admin/admins/edit/${admin.id}`)}
                className="px-4 py-1 rounded-full text-white text-center text-sm cursor-pointer bg-orange-500 w-fit"
              >
                ویرایش
              </div>
            </div>
            <div className="w-1/6 text-right">
              <div
                onClick={() => handleDelete(admin.id)}
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
