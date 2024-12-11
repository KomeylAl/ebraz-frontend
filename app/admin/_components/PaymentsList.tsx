'use client'

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = getCookie("token")?.toString();

  const getPayments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/payments`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setPayments(response.data);
      }
    } catch (error) {
      console.log(error, "PAYMENTS_GET_ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
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
    <div className="w-full flex flex-col md:max-h-[650px] max-h-[450px] h-fit pr-6 pl-2 mt-6">
      <div
        className="flex items-center 
           md:justify-between py-4 border-b 
           border-gray-200 overflow-x-scroll gap-28
           md:overflow-x-hidden
           md:gap-0"
      >
        <div className="w-1/6 text-right font-bold">#</div>
        <div className="w-1/6 text-right font-bold">مراجع</div>
        <div className="w-1/6 text-right font-bold">پزشک</div>
        <div className="w-1/6 text-right font-bold">تاریخ مراجعه</div>
        <div className="w-1/6 text-right font-bold">مبلغ</div>
        <div className="w-1/6 text-right font-bold">وضعیت</div>
      </div>
      <div
        className="overflow-y-scroll overflow-x-scroll
           md:overflow-x-hidden"
      >
        {payments.map((payment: any) => (
          <div
            className="flex items-center md:justify-between py-4 gap-28 md:gap-0"
            key={payment.id}
          >
            <div className="w-1/6 text-right">{payment.id}</div>
            <div className="w-1/6 text-right">{payment.client}</div>
            <div className="w-1/6 text-right">{payment.doctor}</div>
            <div className="w-1/6 text-right">{payment.referral_date}</div>
            <div
              className={`w-1/6 text-lg text-right ${
                payment.status === "unpaid" ? "text-amber-500" : "text-sky-600"
              }`}
            >
              {payment.amount}
            </div>
            <div
              className={`w-1/6 text-right ${
                payment.status === "unpaid" ? "text-rose-500" : "text-green-500"
              }`}
            >
              {payment.status === "paid" ? "پرداخت شده" : "پرداخت نشده"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
