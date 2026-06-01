"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function getTodayKey() {
  return new Date().toLocaleDateString("en-CA");
}

function getTodayCourses(schedule) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const today = days[new Date().getDay()];

  if (!Array.isArray(schedule)) return [];

  return schedule.filter((course) => {
    const hasDaysArray = Array.isArray(course.days);
    const hasSingleDay = typeof course.day === "string";

    return (
      (hasDaysArray && course.days.includes(today)) ||
      (hasSingleDay && course.day === today)
    );
  });
}

function calculateStats(schedule, attendance) {
  let safe = 0;
  let risk = 0;

  schedule.forEach((course) => {
    const stats = attendance[course.id] || { present: 0, total: 0 };
    const percent = stats.total ? (stats.present / stats.total) * 100 : 0;

    if (percent >= 80) safe++;
    else if (stats.total > 0) risk++;
  });

  return { total: schedule.length, safe, risk };
}

function calculateDaysLeft(dates) {
  if (!dates?.endDate) return 0;

  const diff = Math.ceil(
    (new Date(dates.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return diff > 0 ? diff : 0;
}

function calculateSemesterProgress(dates) {
  if (!dates?.startDate || !dates?.endDate) return 0;

  const start = new Date(dates.startDate).getTime();
  const end = new Date(dates.endDate).getTime();
  const now = Date.now();

  if (now <= start) return 0;
  if (now >= end) return 100;

  return ((now - start) / (end - start)) * 100;
}

// Main function

export default function Dashboard() {
  const navigate = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [schedule] = useState(() =>
    loadFromStorage("scheduleList", [])
  );

  const [attendanceData] = useState(() =>
    loadFromStorage("attendanceData", {})
  );

  const [semesterDates] = useState(() =>
    loadFromStorage("semesterDates", null)
  );

  const [todayLog] = useState(() => {
    const today = getTodayKey();
    const lastDate = loadFromStorage("lastAttendanceDate", "");

    if (lastDate === today) {
      return loadFromStorage("dailyAttendanceLog", {});
    }

    return {};
  });

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const todayClasses = getTodayCourses(schedule);
  const stats = calculateStats(schedule, attendanceData);
  const daysLeft = calculateDaysLeft(semesterDates);
  const semesterProgress = calculateSemesterProgress(semesterDates);
  const markedToday = Object.keys(todayLog).length;

  const allMarked =
    markedToday === todayClasses.length && todayClasses.length > 0;

  function getCoursePercent(courseId) {
    const d = attendanceData[courseId] || { present: 0, total: 0 };
    if (!d.total) return 0;
    return Math.round((d.present / d.total) * 100);
  }

  function getPercentColor(p) {
    if (p >= 80) return "text-green-700 bg-green-100";
    if (p >= 75) return "text-yellow-700 bg-yellow-100";
    return "text-red-700 bg-red-100";
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <Header 
      title="Dashboard Page" 
      subtitle="Your dashboard is here."
    />

    <SideBar
      isSidebarOpen={isSidebarOpen}
      sidebarClose={toggleSidebar}
    />
    
      <main className="min-h-screen w-full bg-gray-50 mt-14">

      {/* OFFSET WRAPPER (FIX FOR SIDEBAR) */}
      <div className="w-full lg:pl-[350px]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 font-[Segoe_UI]">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
            <div className="flex items-center gap-4 p-5 rounded-xl shadow-sm bg-white">
              📚
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-500">Courses</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-xl shadow-sm bg-gradient-to-r from-green-500 to-green-600 text-white">
              ✓
              <div>
                <div className="text-2xl font-bold">{stats.safe}</div>
                <div className="text-sm">Safe</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-xl shadow-sm bg-gradient-to-r from-red-500 to-red-600 text-white">
              ⚠
              <div>
                <div className="text-2xl font-bold">{stats.risk}</div>
                <div className="text-sm">At Risk</div>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate.push("/attendance")}
              className="flex items-center gap-4 p-6 rounded-xl shadow-sm bg-blue-600 text-white active:opacity-75 cursor-pointer"
            >
              ✏️
              <div className="flex-1">
                <h3 className="font-semibold">Mark Attendance</h3>
                <p className="text-sm opacity-90">
                  {todayClasses.length > 0
                    ? `${markedToday}/${todayClasses.length} marked`
                    : "No classes today"}
                </p>
              </div>
              →
            </button>

            <button
              onClick={() => navigate.push("/table")}
              className="flex items-center gap-4 p-6 rounded-xl shadow-sm border-gray-800 active:opacity-75 cursor-pointer"
            >
              📅
              <div className="flex-1">
                <h3 className="font-semibold">Edit Timetable</h3>
                <p className="text-sm text-gray-500">
                  {stats.total} courses
                </p>
              </div>
              →
            </button>
          </div>

          {/* SEMESTER */}
          {semesterDates && (
            <div className="p-5 rounded-xl shadow-sm mb-7 bg-white">
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${semesterProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Semester Progress</span>
                <span>{daysLeft} days left</span>
              </div>
            </div>
          )}

          {/* COURSES */}
          <section className="p-6 rounded-xl shadow-sm bg-white">
            <div className="flex justify-between mb-4">
              <h2>Todays Classes</h2>
              <span className="text-sm text-gray-400">
                {allMarked
                  ? "All done!"
                  : `${todayClasses.length - markedToday} remaining`}
              </span>
            </div>

            <div className="space-y-3">
              {todayClasses.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  🎉 No classes today
                </div>
              ) : (
                todayClasses.map((course) => {
                  const percent = getCoursePercent(course.id);
                  const isMarked = todayLog[course.id];

                  return (
                    <button
                      key={course.id}
                      onClick={() => navigate.push("/attendance")}
                      className="flex justify-between items-center w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 active:opacity-75 cursor-pointer"
                    >
                      <div className="text-left">
                        <p className="font-semibold">
                          {course.courseName}
                        </p>
                        <span className="text-sm text-gray-500">
                          {course.time || "No time"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {isMarked ? (
                          <span className="text-sm">
                            {todayLog[course.id] === "present" ? "✓" : "✗"}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Pending
                          </span>
                        )}

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPercentColor(
                            percent
                          )}`}
                        >
                          {percent}%
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
    </>
    
  );
}