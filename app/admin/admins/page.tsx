"use client";

import { AdminsList } from "@/app/admin/_components/AdminsList";
import Header from "@/app/admin/_components/Header";
import { useRouter } from "next/navigation";
import React from "react";

const Admins = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="مدیران سایت" />
      <div className="w-full flex flex-col p-8">
        <div className="w-full h-full flex flex-col bg-white rounded-md shadow-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">مدیران</h2>
            <div
              onClick={() => router.push("/admin/admins/add")}
              className="px-12 py-2 bg-cyan-600 rounded-md text-white text-center cursor-pointer"
            >
              افزودن مدیر
            </div>
          </div>
          <AdminsList />
        </div>
      </div>
    </div>
  );
};

export default Admins;
