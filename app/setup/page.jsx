"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SemesterSetup() {
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
    examDate: "",
  });

  const router = useRouter();
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleDateChange(event) {
    const { id, value } = event.target;

    setDates((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrorMessage("");
  }

  function validateDates({ startDate, endDate, examDate }) {
    if (!startDate || !endDate || !examDate) {
      return "Please fill in all date fields.";
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return "End date must be after start date.";
    }

    const exam = new Date(examDate);

    if (exam < new Date(startDate) || exam > new Date(endDate)) {
      return "Exam date must be within the semester period.";
    }

    return "";
  }

  function handleSave(event) {
    event.preventDefault();

    const error = validateDates(dates);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage("");

    localStorage.setItem("semesterDates", JSON.stringify(dates));

    setShowMessage(true);

    timeoutRef.current = setTimeout(() => {
      setShowMessage(false);
      router.push("/table");
    }, 2000);
  }

  return (
    <main className="max-w-[600px] mx-auto px-5 py-10 font-['Segoe_UI',system-ui,sans-serif] bg-white text-black min-h-screen">
      {showMessage && (
        <div className="fixed top-[50px] right-[380px] z-[1000]">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex items-center gap-2">
            ✅ Saved Successfully
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-10 px-5 max-[640px]:px-2.5">
        <div className="flex flex-col items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-base shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
            1
          </span>
          <span className="text-xs text-blue-500 font-medium max-[640px]:text-[10px]">
            Dates
          </span>
        </div>

        <div className="flex-1 h-[2px] bg-gray-200 mx-4 max-w-[60px]" />

        <div className="flex flex-col items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold text-base">
            2
          </span>
          <span className="text-xs text-gray-500 font-medium max-[640px]:text-[10px]">
            Timetable
          </span>
        </div>

        <div className="flex-1 h-[2px] bg-gray-200 mx-4 max-w-[60px]" />

        <div className="flex flex-col items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold text-base">
            3
          </span>
          <span className="text-xs text-gray-500 font-medium max-[640px]:text-[10px]">
            Attendance
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-[20px] p-8 max-[640px]:p-6 shadow-[0_4px_6px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.05)] mb-6"
      >
        <div className="text-center mb-7">
          <h2 className="text-2xl text-gray-900 mb-2">Academic Dates</h2>
          <p className="text-sm text-gray-500">Set your semester timeline</p>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-lg text-center mb-2">
            {errorMessage}
          </p>
        )}

        {/* Start Date */}
        <div className="mb-6">
          <label
            htmlFor="startDate"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Semester Start Date
          </label>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg opacity-60">📅</span>

            <input
              type="date"
              id="startDate"
              value={dates.startDate}
              onChange={handleDateChange}
              required
              className="w-full py-[14px] pr-4 pl-12 border-2 border-gray-200 rounded-xl text-base text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="mb-6">
          <label
            htmlFor="endDate"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Semester End Date
          </label>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg opacity-60">📅</span>

            <input
              type="date"
              id="endDate"
              value={dates.endDate}
              onChange={handleDateChange}
              required
              className="w-full py-[14px] pr-4 pl-12 border-2 border-gray-200 rounded-xl text-base text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Exam Date */}
        <div className="mb-6">
          <label
            htmlFor="examDate"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Examination Date
          </label>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-lg opacity-60">📝</span>

            <input
              type="date"
              id="examDate"
              value={dates.examDate}
              onChange={handleDateChange}
              required
              className="w-full py-[14px] pr-4 pl-12 border-2 border-gray-200 rounded-xl text-base text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl text-base font-semibold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:-translate-y-[2px] active:translate-y-0 active:opacity-80 transition-all"
        >
          💾 Save & Continue
        </button>
      </form>

      {/* Info Tip */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
        <span className="text-xl">💡</span>
        <p className="text-sm text-blue-800 m-0">
          You can edit these dates later from the settings menu.
        </p>
      </div>
    </main>
  );
}