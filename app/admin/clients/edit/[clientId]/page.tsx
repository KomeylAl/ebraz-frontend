'use client'

import Header from '@/app/admin/_components/Header'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface EditClientPageProps {
  params: {
    clientId : string
  }
}

const EditClient: React.FC<EditClientPageProps> = ({ params }) => {

  const [client, setClient] : any = useState({})
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [errors, setErrors] : any = useState();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const token = getCookie('token')?.toString();

  useEffect(() => {
    const getClient = async (clientId: string) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients/${clientId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      setClient(response.data[0])
      setName(response.data[0].name)
      setAddress(response.data[0].address)
      setPhone(response.data[0].phone)
      setBirthDate(response.data[0].birth_date)
    }

    getClient(params.clientId)
  }, [params.clientId])

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients/${params.clientId}/edit`,
        {
          'name': name || client.name,
          'phone': phone || client.phone,
          'address': address || client.address,
          'birth_date': birthDate || client.birth_date,
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
        router.push('/admin/clients')
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
    <div className='w-full h-full flex flex-col'>
      <Header pageTitle='ویرایش اطلاعات مراجع' />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>نام و نام خانوادگی</label>
            <input
              placeholder={client.name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>آدرس</label>
            <input
              placeholder={client.address}
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
              placeholder={client.phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ تولد</label>
            <div className="w-full">
              <DatePicker
                placeholder={client.birth_date}
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

export default EditClient