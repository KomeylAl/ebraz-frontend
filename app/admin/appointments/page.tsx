import Header from "@/app/admin/_components/Header";
import React from "react";
import { AppinmentsList } from "@/app/admin/_components/AppointmentsList";

const Appinments = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="نوبت ها" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col bg-white rounded-md shadow-md p-4">
          <AppinmentsList />
        </div>
      </div>
    </div>
  );
};

export default Appinments;
