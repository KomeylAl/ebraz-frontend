'use client'

import Header from '@/app/admin/_components/Header'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface EditDoctorPageProps {
  params: {
    doctorId : string
  }
}

const EditDoctor: React.FC<EditDoctorPageProps> = ({ params }) => {

  const [doctor, setDoctor] : any = useState({})
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAdress] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [errors, setErrors] : any = useState();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = getCookie('token')?.toString();

  useEffect(() => {
    const getDoctor = async (doctorId: string) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${doctorId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      setDoctor(response.data[0])
      setName(response.data[0].name)
      setAdress(response.data[0].address)
      setPhone(response.data[0].phone)
      setBirthDate(response.data[0].birth_date)
    }

    getDoctor(params.doctorId)
  }, [params.doctorId])

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/${params.doctorId}/edit`,
        {
          'name': name || doctor.name,
          'phone': phone || doctor.phone,
          'address': address || doctor.address,
          'birth_date': birthDate || doctor.birth_date,
        }, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      if (response.status === 200) {
        router.push('/admin/doctors')
      }
    } catch (error: any) {
      console.log(error, "DOCTOR_EDIT_ERROR");
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
    <div className='w-full h-full flex flex-col'>
      <Header pageTitle='ویرایش اطلاعات پزشک' />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              placeholder={doctor.name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>آدرس</label>
            <input
              placeholder={doctor.address}
              onChange={(e) => setAdress(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>شماره تلفن</label>
            <input
              placeholder={doctor.phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                placeholder={doctor.birth_date}
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
        <div className="mt-9 text-red-600">
          <p>{renderErrors("name")}</p>
          <p>{renderErrors("address")}</p>
          <p>{renderErrors("phone")}</p>
          <p>{renderErrors("birth_date")}</p>
        </div>
      </div>
    </div>
  )
}

export default EditDoctor