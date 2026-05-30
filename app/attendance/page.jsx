 "use client"

import { useState, useEffect } from "react";
// import { Header } from "../components/Header";
// import { SideBar } from "../components/Sidebar";
// import { SaveMessage } from "../components/SaveMessage";
// import progress from "../../../public/development.png";

const STORAGE_KEYS = {
  SCHEDULE: "scheduleList",
  ATTENDANCE: "attendanceData",
  DAILY_LOG: "dailyAttendanceLog",
  LAST_DATE: "lastAttendanceDate",
};

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function getTodayCourses(schedule) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];

  if (!schedule || schedule.length === 0) return [];

  return schedule.filter((course) => course.day === today);
}

export default function Attendance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [todayLog, setTodayLog] = useState({});
  const [markedCount, setMarkedCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = getTodayKey();
    const lastDate = loadFromStorage(STORAGE_KEYS.LAST_DATE, "");

    let dailyLog = lastDate === today
      ? loadFromStorage(STORAGE_KEYS.DAILY_LOG, {})
      : {};

    saveToStorage(STORAGE_KEYS.LAST_DATE, today);
    saveToStorage(STORAGE_KEYS.DAILY_LOG, dailyLog);

    const schedule = loadFromStorage(STORAGE_KEYS.SCHEDULE, []);
    const attendance = loadFromStorage(STORAGE_KEYS.ATTENDANCE, {});

    setCourses(getTodayCourses(schedule));
    setAttendanceData(attendance);
    setTodayLog(dailyLog);
    setMarkedCount(Object.keys(dailyLog).length);
    setIsLoading(false);
  }, []);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function markAttendance(courseId, status) {
    if (todayLog[courseId]) {
      setErrorMessage("Already marked today");
      return;
    }

    const newLog = { ...todayLog, [courseId]: status };
    saveToStorage(STORAGE_KEYS.DAILY_LOG, newLog);
    setTodayLog(newLog);

    const oldStats = attendanceData[courseId] || { present: 0, total: 0 };

    const newStats = {
      present: status === "present" ? oldStats.present + 1 : oldStats.present,
      total: oldStats.total + 1,
    };

    const updated = { ...attendanceData, [courseId]: newStats };
    saveToStorage(STORAGE_KEYS.ATTENDANCE, updated);
    setAttendanceData(updated);

    setMarkedCount(Object.keys(newLog).length);
  }

  function changeMark(courseId) {
    const previous = todayLog[courseId];
    const updatedLog = { ...todayLog };
    delete updatedLog[courseId];

    saveToStorage(STORAGE_KEYS.DAILY_LOG, updatedLog);
    setTodayLog(updatedLog);

    const oldStats = attendanceData[courseId];

    if (oldStats) {
      const updatedStats = {
        present: previous === "present" ? Math.max(0, oldStats.present - 1) : oldStats.present,
        total: Math.max(0, oldStats.total - 1),
      };

      const updatedAttendance = { ...attendanceData, [courseId]: updatedStats };
      saveToStorage(STORAGE_KEYS.ATTENDANCE, updatedAttendance);
      setAttendanceData(updatedAttendance);
    }

    setMarkedCount(Object.keys(updatedLog).length);
  }

  function handleSaveLog() {
    if (markedCount === 0) return;

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* <link rel="icon" href={progress} /> */}
      <title>Attendance</title>

      {/* <Header title="Mark Attendance" subtitle="Step 3: Track attendance" />

      <SideBar isSidebarOpen={isSidebarOpen} sidebarClose={toggleSidebar} /> */}

      {/* <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 flex flex-col gap-1"
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button> */}

      {/* <SaveMessage showMessage={showMessage} /> */}

      <main className="max-w-[700px] mx-auto lg:ml-[420px] px-5 py-8 pb-24">

        {/* PROGRESS BAR (RESTORED) */}
        <div className="flex items-center justify-center gap-4 mb-8">

          <div className="flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">1</span>
            <span className="text-xs">Dates</span>
          </div>

          <div className="w-10 h-[2px] bg-gray-200"></div>

          <div className="flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">2</span>
            <span className="text-xs">Timetable</span>
          </div>

          <div className="w-10 h-[2px] bg-gray-200"></div>

          <div className="flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">3</span>
            <span className="text-xs text-blue-500">Attendance</span>
          </div>

        </div>

        <section className="flex flex-col gap-4">

          `{courses.length === 0 ? (
            <div className="text-center py-12 px-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">

              <span className="text-5xl block mb-4">📅</span>

              <p className="text-xl font-semibold text-gray-700 mb-2">
                No classes today!
              </p>

              <p className="text-gray-500 mb-4">
                Today is {new Date().toLocaleDateString("en-US", { weekday: "long" })}.
              </p>

              <p className="text-sm text-gray-400 bg-white inline-block px-3 py-2 rounded-md">
                <strong>Tip:</strong> Go to the Timetable page and add courses for this day.
              </p>

            </div>
          ) : (
            courses.map((course) => {
              const status = todayLog[course.id];
              const isMarked = !!status;
              const stats = attendanceData[course.id] || { present: 0, total: 0 };

              let percent = 0;
              if (stats.total > 0) {
                percent = Math.round((stats.present / stats.total) * 100);
              }

              let percentColor = "text-red-700 bg-red-100";
              if (percent >= 80) percentColor = "text-green-700 bg-green-100";
              else if (percent >= 75) percentColor = "text-yellow-700 bg-yellow-100";

              return (
                <div
                  key={course.id}
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border-l-4 transition ${
                    isMarked
                      ? status === "present"
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-transparent"
                  }`}
                >

                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.courseName}
                    </h3>

                    <div className="flex gap-4 text-sm text-gray-500 mt-2">
                      <span>🕐 {course.time || `${course.start} - ${course.end}`}</span>
                      <span>📍 {course.day}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${percentColor}`}>
                        {percent}% attendance
                      </span>

                      <span className="text-xs text-gray-400">
                        ({stats.present}/{stats.total} classes)
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-2">

                    {!isMarked ? (
                      <>
                        <button
                          onClick={() => markAttendance(course.id, "present")}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                        >
                          ✓ Present
                        </button>

                        <button
                          onClick={() => markAttendance(course.id, "absent")}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                        >
                          ✗ Absent
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-end gap-2">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            status === "present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {status === "present" ? "✓ Present" : "✗ Absent"}
                        </span>

                        <button
                          onClick={() => changeMark(course.id)}
                          className="text-sm text-gray-500 underline hover:text-gray-700"
                        >
                          ↺ Change
                        </button>

                      </div>
                    )}

                  </div>
                </div>
              );
            })
          )}

        </section>`

        {/* ERROR */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* SAVE BUTTON */}
        {courses.length > 0 && (
          <div className="fixed bottom-6 left-[calc(50%+210px)] -translate-x-1/2 z-50">
            <button
              onClick={handleSaveLog}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg"
            >
              Save Log
            </button>
          </div>
        )}

      </main>
    </>
  );
}