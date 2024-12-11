"use client";

import Header from "@/app/admin/_components/Header";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import fa from "react-date-object/locales/persian_fa";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const AddClass = () => {
  const token = getCookie("token")?.toString();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors]: any = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStatDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [dayTime, setDayTime]: any = useState([]);

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher]: any = useState();
  const [selectedStudents, setSelectedStudents]: any = useState();

  const teachersOptions: any = [];
  const studentsOptions: any = [];

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/doctors/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/clients/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    const newDates = [];
    for (let i = 0; i < dayTime[0].length; i++) {
      newDates.push(
        dayTime[0][i]
          .toDate()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
          .slice(0, 10)
      );
    }
    const students = [];
    for (let i = 0; i < selectedStudents.length; i++) {
      students.push(selectedStudents[i].value);
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/classes/add`,
        {
          teacher: selectedTeacher,
          title: title,
          description: description,
          start_date: startDate,
          end_date: endDate,
          week_day: weekDay,
          time: time,
          session_dates: newDates,
          students: students,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        router.push("/admin/classes");
      }
    } catch (e: any) {
      setErrors(e.response.data.errors);
      console.log(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  const renderErrors = (field: any) =>
    errors?.[field]?.map((error: any, index: any) => (
      <div key={index} className="text-red-600">
        {error}
      </div>
    ));

  const handleTeacherChange = (selectedOption: any) => {
    setSelectedTeacher(selectedOption.value);
  };

  const handleStudentsAdd = (selectedOption: any) => {
    setSelectedStudents(selectedOption);
  };

  function handleChange(value: any) {
    const dates: any = [];
    dates.push(value);
    setDayTime(dates);
    console.log(dates);
    console.log(dayTime, "daytime");
  }

  teachers.map((teacher: any) => {
    teachersOptions.push({
      value: teacher.id,
      label: teacher.name,
    });
  });

  students.map((student: any) => {
    studentsOptions.push({
      value: student.id,
      label: student.name,
    });
  });

  return (
    <div className="w-full h-full flex flex-col">
      <Header pageTitle="افزودن کلاس" />
      <div className="w-full h-full p-8 flex flex-col">
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>عنوان کلاس</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>مدرس</label>
            <ReactSelect
              className="mt-2 focus:ring-black focus:border-black"
              placeholder="انتخاب مدرس"
              defaultInputValue={selectedTeacher}
              onChange={handleTeacherChange}
              options={teachersOptions}
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>توضیحات کلاس</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            ></textarea>
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>تاریخ شروع</label>
            <div className="w-full">
              <DatePicker
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                onChange={(e: any) => setStatDate(e.toString())}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="w-full">
            <label>تاریخ پایان</label>
            <div className="w-full">
              <DatePicker
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                onChange={(e: any) => setEndDate(e.toString())}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
          <div className="w-full">
            <label>روز هفته</label>
            <input
              onChange={(e) => setWeekDay(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
          <div className="w-full">
            <label>ساعت</label>
            <input
              onChange={(e) => setTime(e.target.value)}
              type="text"
              className="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
            />
          </div>
        </div>
        <div className="w-full flex gap-3 mt-9">
          <div className="w-full">
            <label>تاریخ های برگزاری کلاس (لیست حضور و غیاب)</label>
            <div className="w-full">
              <DatePicker
                calendarPosition="bottom-right"
                inputClass="w-full bg-white py-2 rounded-md shadow-sm px-2 mt-2"
                containerClassName="w-full"
                multiple
                dateSeparator=" - "
                plugins={[
                  // eslint-disable-next-line react/jsx-key
                  <DatePanel />,
                ]}
                onChange={handleChange}
                calendar={persian}
                locale={fa}
                format="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full mt-9">
          <div className="w-full">
            <label>انتخاب دانشجویان</label>
            <ReactSelect
              className="mt-2 focus:ring-black focus:border-black"
              placeholder="انتخاب دانشجویان"
              isMulti
              backspaceRemovesValue={true}
              defaultValue={selectedStudents}
              onChange={handleStudentsAdd}
              options={studentsOptions}
            />
          </div>
        </div>
        <div
          onClick={handleSubmit}
          className={`
            mt-9 w-52 cursor-pointer text-center rounded-md py-2 text-white
            ${loading ? "bg-blue-400" : "bg-blue-700"}`}
        >
          افزودن کلاس
        </div>
        <div className="mt-9 text-red-600">
          <p>{renderErrors("teacher")}</p>
          <p>{renderErrors("title")}</p>
          <p>{renderErrors("description")}</p>
          <p>{renderErrors("start_date")}</p>
          <p>{renderErrors("end_date")}</p>
          <p>{renderErrors("week_day")}</p>
          <p>{renderErrors("time")}</p>
          <p>{renderErrors("students")}</p>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
