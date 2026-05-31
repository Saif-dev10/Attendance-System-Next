"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header({ title, subtitle }) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  function toggleNotifications() {
    setShowNotifications((prev) => !prev);
  }

  function closeNotifications() {
    setShowNotifications(false);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[2000] bg-gradient-to-br from-white to-slate-50 border-b border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-all lg:left-[260px]">

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[60px] lg:h-[70px] flex items-center justify-between relative">
          
          {/* Left */}
          <div className="hidden lg:flex items-center flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-[10px] flex items-center justify-center text-lg shadow-md">
                🎓
              </span>
              <span className="text-lg font-bold text-slate-800 tracking-[-0.5px]">
                AttendTrack
              </span>
            </div>
          </div>

          {/* Center */}
          <div className="flex-1 lg:flex-[2] text-center flex flex-col items-center justify-center px-[60px] lg:px-5">
            <h1 className="text-lg lg:text-[22px] font-bold text-slate-800 leading-tight truncate max-w-full">
              {title || "Page Title"}
            </h1>

            <p className="hidden lg:block text-[13px] text-slate-500 mt-0.5 font-normal">
              {subtitle || ""}
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-3 flex-1">
            <button
              title="Notifications"
              onClick={toggleNotifications}
              className="w-10 h-10 rounded-[10px] bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-lg relative transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>🔔</span>
              <span className="hidden absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <button
              title="Go to Dashboard"
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </header>

      {showNotifications && (
        <>
          <div
            onClick={closeNotifications}
            className="fixed inset-0 bg-black/30 z-[3500]"
          />
          <NotificationDropdown onClose={closeNotifications} />
        </>
      )}
    </>
  );
}

function NotificationDropdown({ onClose }) {
  const router = useRouter();

  const schedule =
    JSON.parse(localStorage.getItem("scheduleList") || "[]");
  const todayLog =
    JSON.parse(localStorage.getItem("dailyAttendanceLog") || "{}");
  const attendanceData =
    JSON.parse(localStorage.getItem("attendanceData") || "{}");
  const semesterDates =
    JSON.parse(localStorage.getItem("semesterDates") || "null");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = days[new Date().getDay()];
  const todayClasses = schedule.filter((course) => course.day === today);
  const markedToday = Object.keys(todayLog).length;
  const unmarkedCount = todayClasses.length - markedToday;

  const notifications = [];

  if (unmarkedCount > 0) {
    notifications.push({
      id: "unmarked",
      type: "warning",
      icon: "⏰",
      title: `${unmarkedCount} class${unmarkedCount > 1 ? "es" : ""} pending`,
      message: "Mark attendance for today's classes",
      action: "Mark",
      path: "/attendance",
    });
  }

  if (markedToday === todayClasses.length && todayClasses.length > 0) {
    notifications.push({
      id: "completed",
      type: "success",
      icon: "✅",
      title: "All caught up",
      message: "You've marked all classes today",
    });
  }

  const lowAttendance = todayClasses.filter((course) => {
    const stats = attendanceData[course.id] || {
      present: 0,
      total: 0,
    };

    if (stats.total === 0) return false;
    return (stats.present / stats.total) * 100 < 75;
  });

  lowAttendance.forEach((course) => {
    const stats = attendanceData[course.id];
    const percent = Math.round(
      (stats.present / stats.total) * 100
    );

    notifications.push({
      id: `risk-${course.id}`,
      type: "danger",
      icon: "⚠️",
      title: `${course.courseName} at risk`,
      message: `Attendance: ${percent}%`,
      action: "View",
      path: "/attendance",
    });
  });

  const daysLeft = semesterDates?.endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(semesterDates.endDate) - new Date()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  if (daysLeft <= 7 && daysLeft > 0) {
    notifications.push({
      id: "semester-ending",
      type: "info",
      icon: "📅",
      title: "Semester ending soon",
      message: `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`,
    });
  }

  function handleAction(path) {
    onClose();
    if (path) router.push(path);
  }

  const borderColors = {
    warning: "border-yellow-500",
    success: "border-green-500",
    danger: "border-red-500",
    info: "border-blue-500",
  };

  return (
    <div className="fixed top-[70px] sm:top-20 right-3 sm:right-6 left-3 sm:left-auto sm:w-[380px] max-h-[500px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[3600] flex flex-col overflow-hidden">
      
      <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
        <h3 className="text-base font-semibold text-slate-800">
          Notifications
        </h3>

        <button
          onClick={onClose}
          className="text-lg text-slate-400 hover:text-slate-500"
        >
          ✕
        </button>
      </div>

      <div className="overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <span className="text-3xl block mb-3">🔕</span>
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          notifications.map((note) => (
            <div
              key={note.id}
              className={`flex items-center gap-3 p-3.5 mb-1.5 rounded-[10px] hover:bg-slate-50 border-l-4 ${borderColors[note.type]}`}
            >
              <span className="text-xl shrink-0">{note.icon}</span>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {note.title}
                </p>

                <p className="text-[13px] text-slate-500">
                  {note.message}
                </p>
              </div>

              {note.action && (
                <button
                  onClick={() => handleAction(note.path)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold"
                >
                  {note.action}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}