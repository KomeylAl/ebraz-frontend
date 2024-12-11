"use client";

import { MdClass, MdDashboard, MdPayment } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiList } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const Navbar = () => {
  const links = [
    {
      title: "داشبورد",
      link: "/admin",
      access: "admin",
      icon: <MdDashboard />,
    },
    {
      title: "نوبت ها",
      link: "/admin/appointments",
      access: "admin",
      icon: <SlCalender />,
    },
    {
      title: "مراجعان",
      link: "/admin/clients",
      access: "admin",
      icon: <FiList />,
    },
    {
      title: "پزشکان",
      link: "/admin/doctors",
      access: "admin",
      icon: <IoPerson />,
    },
    {
      title: "پرداخت ها",
      link: "/admin/payments",
      access: "admin",
      icon: <MdPayment />,
    },
    {
      title: "کلاس ها و کارگاه ها",
      link: "/admin/classes",
      access: "admin",
      icon: <MdClass />,
    },
    {
      title: "مدیران سایت",
      link: "/admin/admins",
      access: "boss",
      icon: <FiList />,
    },
  ];

  const pathName = usePathname();
  const [user, setUser]: any = useState({});
  const userToken = getCookie("token");

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
    <div className="flex flex-col gap-4 w-full">
      {links.map((link) => {
        if (user.role === "boss") {
          return (
            <Link
              href={link.link}
              className={`text-white flex items-center 
                            gap-2 text-lg w-full px-4 py-2
                            ${
                              pathName === link.link
                                ? "bg-cyan-900 rounded-md"
                                : "bg-transparent"
                            }
                            `}
              key={link.link}
            >
              {link.icon} {link.title}
            </Link>
          );
        } else if (user.role === "admin") {
          return link.access === "admin" ? (
            <Link
              href={link.link}
              className={`text-white flex items-center 
                            gap-2 text-lg w-full px-4 py-2
                            ${
                              pathName === link.link
                                ? "bg-cyan-900 rounded-md"
                                : "bg-transparent"
                            }
                            `}
              key={link.link}
            >
              {link.icon} {link.title}
            </Link>
          ) : (
            <div></div>
          );
        }
      })}
    </div>
  );
};

export default Navbar;
