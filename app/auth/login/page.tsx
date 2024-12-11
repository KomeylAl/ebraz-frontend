'use client';

import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    if (!phone || !password) {
      toast.error('لطفا همه فیلد ها را پر کنید')
    } else {
      try{
        setIsLoading(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/login`, {
          'phone' : phone,
          'password' : password,
          headers : {
            'Accept' : 'application/json',
            'Content-type' : 'application/json'
          }
        });
        if (response.status === 200) {
          setCookie('token', response.data.access_token, { maxAge: 7200 });
          toast.success('وارد شدید. لطفا کمی صبر کنید.')
          router.push('/admin');
          setIsLoading(false);
        } 
      } catch (e: any) {
        setIsLoading(false);
        if(!e.response || e.response.status === 500) {
          toast.error('خطا در اتصال به سرور');
          console.log(e.toString());
        } else if (e.response.status === 401) {
          setIsLoading(false);
          toast.error('نام کاربری یا رمز عبور اشتباه است')
        }     
      }
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center ">
      <div className="flex flex-col gap-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-600 text-center">
          کلینیک ابراز - ورود
        </h1>
        <div className="md:w-[600px] h-fit bg-white shadow-md rounded-md p-10 flex flex-col justify-between items-start">
          <div className="w-full flex flex-col gap-6">
            <div className="w-full">
              <label>شماره تلفن</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="w-full bg-white border border-sky-300 py-2 rounded-md shadow-sm px-2 mt-4"
              />
            </div>
            <div className="w-full">
              <label>رمز عبور</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                className="w-full bg-white border border-sky-300 py-2 rounded-md shadow-sm px-2 mt-4"
              />
            </div>
          </div>
          <div
          onClick={handleSubmit}
            className={
              `w-44 p-2 rounded-md text-center text-white mt-8
               ${isLoading ? 'bg-sky-300 cursor-not-allowed' : 'bg-sky-600 cursor-pointer'}
              `
            }>
            ورود
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
