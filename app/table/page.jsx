"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";
// import { SaveMessage } from "@/components/SaveMessage";
// import table from "/public/table.png";

export default function TablePage() {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [days, setDays] = useState("");
  const [courseName, setCourseName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [schedule, setSchedule] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("scheduleList")) || [];
    }
    return [];
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((p) => !p);
  }

  function toMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  function addToSchedule() {
    if (!days || !courseName || !startTime || !endTime) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    if (toMinutes(startTime) >= toMinutes(endTime)) {
      setErrorMessage("End time must be after start time.");
      return;
    }

    setErrorMessage("");

    setSchedule((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        day: days,
        courseName,
        start: startTime,
        end: endTime,
      },
    ]);

    setDays("");
    setCourseName("");
    setStartTime("");
    setEndTime("");
  }

  function deleteClass(id) {
    setSchedule((prev) => prev.filter((i) => i.id !== id));
  }

  function saveInfo() {
    if (!schedule.length) {
      setErrorMessage(
        "Please add at least one course to the schedule before saving."
      );
      return;
    }

    setErrorMessage("");
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      router.push("/attendance");
    }, 2000);
  }

  useEffect(() => {
    localStorage.setItem("scheduleList", JSON.stringify(schedule));
  }, [schedule]);

  return (
    <div className="font-[Segoe_UI] bg-white min-h-screen">
       {/* <link rel="icon" href={table} /> */}

         <SideBar 
            isSidebarOpen={isSidebarOpen} 
            sidebarClose={toggleSidebar}
          />
         
         {/* <SaveMessage showMessage={showMessage} /> */}

      {/* sidebar toggle */}
      {/* <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 flex flex-col gap-[5px]"
      >
        <span className="w-6 h-[2px] bg-black"></span>
        <span className="w-6 h-[2px] bg-black"></span>
        <span className="w-6 h-[2px] bg-black"></span>
      </button> */}

      <Header 
        title="Timetable Setup" 
        subtitle="Step 2: Add your weekly courses"
      />

      {/* MAIN CONTAINER (matches padding-left:300px + max-width:1000px) */}
      <main className="max-w-[1000px] mx-auto px-5 py-[30px] lg:pl-[300px] box-border font-[Segoe_UI,system-ui,sans-serif] mt-16">
        {/* PROGRESS BAR */}
        <div className="flex items-center justify-center mb-10 px-5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
              1
            </div>
            <span className="text-xs text-gray-500">Dates</span>
          </div>

          <div className="flex-1 max-w-[60px] h-[2px] bg-gray-200 mx-4"></div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
              2
            </div>
            <span className="text-xs text-blue-600">Timetable</span>
          </div>

          <div className="flex-1 max-w-[60px] h-[2px] bg-gray-200 mx-4"></div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-xs text-gray-500">Attendance</span>
          </div>
        </div>

        {/* FORM */}
        <section className="bg-white rounded-[20px] p-7 shadow-[0_4px_6px_rgba(0,0,0,0.05)] mb-8">
          <div className="mb-6">
            <h2 className="text-[20px] font-semibold text-gray-900">
              Add New Class
            </h2>
            <p className="text-sm text-gray-500">Enter course details below</p>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center text-[18px] mb-3">
              {errorMessage}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Day of Week
              </label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="p-3 bg-gray-50 border-2 border-gray-200 rounded-[10px] text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
              >
                <option value="">Select day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Course Name
              </label>
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g., Introduction to Computer Science"
                className="p-3 bg-gray-50 border-2 border-gray-200 rounded-[10px] focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="p-3 bg-gray-50 border-2 border-gray-200 rounded-[10px]"
              >
                <option value="">Start</option>
                <option value="8:00">8:00 AM</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="p-3 bg-gray-50 border-2 border-gray-200 rounded-[10px]"
              >
                <option value="">End</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
            </div>
          </div>

          <button
            onClick={addToSchedule}
            className="w-full p-3 bg-emerald-500 text-white rounded-[10px] font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition active:opacity-80 cursor-pointer"
          >
            + Add to Schedule
          </button>
        </section>

        {/* SCHEDULE */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-semibold">Weekly Schedule</h2>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
              {schedule.length} courses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-[16px] shadow-sm overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-4 font-semibold text-[16px]">
                  {item.day}
                </div>

                <div className="p-4 min-h-[100px]">
                  <div className="bg-gray-50 rounded-[10px] p-3 border-l-4 border-blue-500 relative group transition hover:bg-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.courseName}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      🕐 {item.start} - {item.end}
                    </p>

                    <button
                      onClick={() => deleteClass(item.id)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-red-100 text-red-600 px-3 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SAVE */}
        <div className="sticky bottom-5 flex justify-center">
          <button
            onClick={saveInfo}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_14px_28px_rgba(59,130,246,0.4)] transition active:opacity-75 cursor-pointer"
          >
            💾 Save Timetable
          </button>
        </div>
      </main>
    </div>
  );
}