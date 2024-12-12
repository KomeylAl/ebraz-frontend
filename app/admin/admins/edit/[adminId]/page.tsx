import AdminEditComp from "@/app/admin/_components/AdminEditComp";
import Header from "@/app/admin/_components/Header";
import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import React from "react";

interface EditAdminsPageProps {
  params: {
    adminId: number;
  };
}

export default async function EditAdmins({ params }: EditAdminsPageProps) {
  
  const cookie = await cookies()
  const token = cookie.get('token')

  let admin: any;
  await axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/admins/${params.adminId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    )
    .then(function (response) {
      admin = response.data;
    })
    .catch(function (error) {
      console.log(error);
      return
    });

  return ( 
    <AdminEditComp data={admin[0]} token={token?.value} />
  );
}
