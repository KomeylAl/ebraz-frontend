"use client";

import Header from "@/app/admin/_components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const AddAppoinments = () => {
  const [selectedClient, setSelectedClient]: any = useState();
  const [selectedDoctor, setSelectedDoctor]: any = useState();
  const [selectedStatus, setSelectedStatus]: any = useState();
  const [amountStatus, setAmountStatus]: any = useState();
  const [amount, setAmout] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors]: any = useState();

  const router = useRouter();
  const token = getCookie("token")?.toString();

  const [clients, setClients]: any = useState([]);
  const [doctors, setDoctors]: any = useState([]);

  const doctorsOptions: any = [];
  const clientsOptions: any = [];
  const statusOptions = [
    { value: "pending", label: "انجام نشده" },
    { value: "done", label: "انجام شده" },
  ];
  const amountStatusOptions = [
    { value: "unpaid", label: "پرداخت نشده" },
    { value: "paid", label: "پرداخت شده" },
  ];

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/appointments/add`,
        {
          doctor: selectedDoctor,
          client: selectedClient,
          amount: amount,
          date: date,
          status: selectedStatus,
          amount_status: amountStatus,
          time: time,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        router.push("/admin/appointments");
      }
    } catch (error: any) {
      console.log(error, "CLIENT_ADD_ERROR");
      setErrors(error.response.data.errors);
      console.log(error);
      setIsLoading(false);
    }
  };

  const renderErrors = (field: any) =>
    errors?.[field]?.map((error: any, index: any) => (
      <div key={index} className="text-red-600">
        {error}
      </div>
    ));

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setDoctors(response.data);
      } else {
        console.log(response.data);
      }
    } catch (e: any) {
      console.log(e.toString());
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        setClients(response.data);
      } else {
        console.log(response.data);
      }
    } catch (e: any) {
      console.log(e.toString());
    }
  };

  useEffect(() => {
    getClients();
    getDoctors();
  }, []);

  doctors.map((doctor: any) => {
    doctorsOptions.push({
      value: doctor.id,
      label: doctor.name,
    });
  });

  clients.map((doctor: any) => {
    clientsOptions.push({
      value: doctor.id,
      label: doctor.name,
    });
  });

  const handleDoctorsChange = (selectedOption: any) => {
    setSelectedDoctor(selectedOption.value);
  };

  const handleClientsChange = (selectedOption: any) => {
    setSelectedClient(selectedOption.value);
  };

  const handleDateChange = (value: any) => {
    setDate(value.toString());
  };

  const handleStatusChange = (selectedOption: any) => {
    setSelectedStatus(selectedOption.value);
  };

  const handleAmountStatusChange = (selectedOption: any) => {
    setAmountStatus(selectedOption.value);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن نوبت" />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>انتخاب پزشک</label>
            <ReactSelect
              className="mt-3 focus:ring-black focus:border-black"
              placeholder="انتخاب پزشک"
              defaultInputValue={selectedDoctor}
              onChange={handleDoctorsChange}
              options={doctorsOptions}
            />
          </div>
          <div className="w-full">
            <label>انتخاب مراجع</label>
            <ReactSelect
              className="mt-3 focus:ring-black focus:border-black"
              placeholder="انتخاب مراجع"
              defaultInputValue={selectedClient}
              onChange={handleClientsChange}
              options={clientsOptions}
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>مبلغ این جلسه</label>
            <input
              onChange={(e) => setAmout(e.target.value)}
              type="number"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>تاریخ جلسه</label>
            <div className="w-full">
              <DatePicker
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                onChange={handleDateChange}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="w-full">
            <label>ساعت جلسه</label>
            <div className="w-full">
              <input
                onChange={(e) => setTime(e.target.value)}
                type="text"
                className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 mt-9">
          <div className="w-full">
            <label>وضعیت</label>
            <ReactSelect
              className="mt-2 focus:ring-black focus:border-black"
              placeholder="انتخاب وضعیت"
              defaultInputValue={selectedStatus}
              onChange={handleStatusChange}
              options={statusOptions}
            />
          </div>
          <div className="w-full">
            <label>وضعیت پرداخت</label>
            <ReactSelect
              className="mt-2 focus:ring-black focus:border-black"
              placeholder="وضعیت پرداخت"
              defaultInputValue={amountStatus}
              onChange={handleAmountStatusChange}
              options={amountStatusOptions}
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
          افزودن نوبت
        </div>
        <div className="mt-9 text-red-600">
          <p>{renderErrors("doctor")}</p>
          <p>{renderErrors("client")}</p>
          <p>{renderErrors("amount")}</p>
          <p>{renderErrors("date")}</p>
          <p>{renderErrors("time")}</p>
          <p>{renderErrors("status")}</p>
          <p>{renderErrors("amount_status")}</p>
        </div>
      </div>
    </div>
  );
};

export default AddAppoinments;
