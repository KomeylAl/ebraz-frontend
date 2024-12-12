'use client'

import Header from '@/app/admin/_components/Header'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface EditAdminsPageProps {
  params: {
    adminId : string
  }
}

const EditAdmins = ({ params }: EditAdminsPageProps) => {

  const [admins, setAdmins] : any = useState({})
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const router = useRouter();
  const token = getCookie('token')?.toString();

  // let admin: any
  // await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${params.adminId}`, {
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  // .then(function (response) {
  //   admin = response.data
  // })
  // .catch(function (error) {
  //   console.log(error)
  //   retur
  // })

  useEffect(() => {
    const getAdmins = async (adminId: string) => {
      setIsAdminLoading(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${adminId}`,{
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data)
        setAdmins(response.data[0])
        setName(response.data[0].name)
        setAddress(response.data[0].address)
        setPhone(response.data[0].phone)
        setBirthDate(response.data[0].birth_date)
        setIsAdminLoading(false)
      } catch(e: any) {
        console.log(e.toString())
        setIsAdminLoading(false)
      }
    }

    getAdmins(params.adminId)
  }, [params.adminId])

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${params.adminId}/edit`,
        {
          'name': name || admins.name,
          'phone': phone || admins.phone,
          'address': address || admins.address,
          'birth_date': birthDate || admins.birth_date,
          'password' : password || admins.password
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        router.push('/admin/admins')
      }
    } catch (error: any) {
      console.log(error, "ADMINS_EDIT_ERROR");
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleBirthDateChange = (value: any) => {
    setBirthDate(value.toString())
  }

  if (isAdminLoading) {
    return (
      <div className='flex items-center justify-center'>
        در حال دریافت اطلاعات
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <Header pageTitle='ویرایش اطلاعات مراجع' />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              placeholder={admins.name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>آدرس</label>
            <input
              placeholder={admins.address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره تلفن</label>
            <input
              placeholder={admins.phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                placeholder={admins.birth_date}
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
          <div className='w-full'>
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
          ویرایش اطلاعات
        </div>
        <p>{token}</p>
      </div>
    </div>
  )
}

export default EditAdmins;