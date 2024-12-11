"use client";

import Header from "@/app/admin/_components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { getCookie } from "cookies-next";

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] : any = useState();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const userToken = getCookie("token");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admins/add",
        {
          'name': name,
          'phone': phone,
          'address': address,
          'birth_date': birthDate || null,
          'password' : password
        },
        {
         headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${userToken}`
         }
        }
      )
      console.log(response.data)
      if (response.status === 201) {
        router.push('/admin/admins');
      }
    } catch (error: any) {
      console.log(error, "CLIENT_ADD_ERROR");
      setErrors(error.response.data.errors)
      console.log(error)
      setIsLoading(false)
    }
  }

  const renderErrors = (field: any) =>
    errors?.[field]?.map((error: any, index: any) => (
      <div key={index} className="text-red-600">
        {error}
      </div>
  ));

  const handleBirthDateChange = (value: any) => {
    setBirthDate(value.toString())
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن مدیر" />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>آدرس</label>
            <input
              onChange={(e) => setaddress(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره تلفن</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                onChange={handleBirthDateChange}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="w-full">
            <label>رمز عبور</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className={`
                mt-9 w-52 cursor-pointer text-center rounded-md py-2 text-white
                ${isLoading ? "bg-blue-400" : "bg-blue-700"}
            `}
        >
          افزودن مدیر
        </div>
        <div className="mt-9 text-red-600">
          <p>{renderErrors("name")}</p>
          <p>{renderErrors("national_code")}</p>
          <p>{renderErrors("phone")}</p>
          <p>{renderErrors("birth_date")}</p>
          <p>{renderErrors("password")}</p>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
