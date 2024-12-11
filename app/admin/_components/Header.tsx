"use client";

import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import axios from "axios";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const date = new Date().toLocaleDateString("fa-IR");
  const [user, setUser]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const userToken = getCookie("token");
  const router = useRouter();

  const handleLogOut = async () => {
    setIsLoading(true)
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/logout`, {}, {
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${userToken}`
        }
      });
      if (response.status === 200) {
        deleteCookie('token');
        router.push('/auth/login');
      }
    } catch (e: any) {
      setIsLoading(false)
      console.log(e.toString())
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/user-info`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data);
        }
        if (response.status === 401) {
          
        }
      } catch (e: any) {
        console.log(e.toString());
      }
    };

    fetchUserData();
  }, [userToken]);

  return (
    <>
      <div className={`${isOpen ? 'bg-black bg-opacity-80' : ''} w-full h-full`}>
        <div className={`${isOpen ? 'flex' : 'hidden'} w-fit h-fit rounded-md p-8 bg-cyan-700 absolute z-10 top-20 right-6 transition-all duration-150`}>
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white w-full h-32 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CgMenuRightAlt
            onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}
            size={25} className="lg:hidden" />
          <h2 className="font-semibold text-xl">{pageTitle}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className={`${isLoading ? 'text-rose-300' : 'text-rose-500'} cursor-pointer`} onClick={handleLogOut}>
          <BiLogOut className="" size={20} />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <IoMdPerson className="text-gray-400" size={20} />
          </div>
          {user.role === "boss" ? (
            <Link href={"/admin/profile"}>
              <p className="cursor-pointer hover:text-sky-600">{user.name}</p>
            </Link>
          ) : (
            <p className="cursor-pointer hover:text-sky-600">{user.name}</p>
          )}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200/40" />
      <div className="w-full flex items-center justify-between">
        <p className="text-sm text-gray-500">
          مشاهده مراجعان، پرداخت ها و روز های کاری
        </p>
        <p>{date}</p>
      </div>
    </div>
    </>
  );
};

export default Header;
