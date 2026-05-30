"use client";

import { useState } from "react";

function getCoursesPercent(courseId, attendanceData) {
  const data = attendanceData[courseId] || { present: 0, total: 0 };
  if (data.total === 0) return 0;
  return Math.round((data.present / data.total) * 100);
}

function getStatus(percent) {
  if (percent === 0) return "neutral";
  if (percent >= 80) return "eligible";
  return "risk";
}

export default function Summary() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ⚠️ still client-side (correct for Next.js App Router)
  const schedule = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("scheduleList") || "[]"
      : "[]"
  );

  const attendance = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("attendanceData") || "{}"
      : "{}"
  );

  let eligibility = 0;
  let atRisk = 0;

  schedule.forEach((course) => {
    const percent = getCoursesPercent(course.id, attendance);
    const status = getStatus(percent);

    if (status === "eligible") eligibility++;
    else if (status === "risk") atRisk++;
  });

  const total = schedule.length;

  function toggleSideBar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <main className="
      max-w-[800px]
      w-full
      mx-auto
      px-6
      py-8
      font-[Segoe_UI]
      text-[#334155]
      leading-[1.6]

      lg:ml-[350px]
      xl:ml-[350px]
      md:ml-0
    ">

      {/* STATUS BANNER */}
      <div
        className={`p-4 rounded-xl mb-8 text-center text-[15px] font-normal border
          ${
            total === 0
              ? "bg-slate-50 border-slate-200 text-slate-600"
              : atRisk === 0
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }
        `}
      >
        {total === 0 ? (
          <p>No courses found. Add courses in Timetable first.</p>
        ) : atRisk === 0 ? (
          <p>All courses eligible for exams!</p>
        ) : (
          <p>{atRisk} course(s) at risk. Attend remaining classes.</p>
        )}
      </div>

      {/* COURSE GRID */}
      <div className="grid gap-4 mb-10">
        {schedule.map((course) => {
          const percent = getCoursesPercent(course.id, attendance);
          const status = getStatus(percent);

          return (
            <div
              key={course.id}
              className={`relative p-5 rounded-xl border bg-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md
                ${
                  status === "eligible"
                    ? "before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:bg-green-500"
                    : status === "risk"
                    ? "before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:bg-red-500"
                    : "before:content-[''] before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:bg-slate-300"
                }
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-[16px] font-semibold text-slate-800 tracking-tight">
                  {course.courseName || course.course}
                </h3>

                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full
                    ${
                      status === "eligible"
                        ? "bg-green-100 text-green-700"
                        : status === "risk"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {status === "eligible"
                    ? "✓ Eligible"
                    : status === "risk"
                    ? "⚠ At Risk"
                    : "○ No Data"}
                </span>
              </div>

              <div className="flex items-end gap-2 mb-4">
                <span className="text-[32px] font-bold text-slate-800 leading-none tracking-tight">
                  {percent}%
                </span>
                <span className="text-[13px] text-slate-400 font-medium">
                  attendance
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL STATS */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
        <h2 className="text-[16px] font-semibold text-slate-800 mb-5">
          Semester Overview
        </h2>

        <div className="grid grid-cols-3 gap-4 max-[640px]:grid-cols-1">
          <div className="text-center p-5 bg-slate-50 rounded-lg">
            <span className="block text-[28px] font-bold text-blue-600">
              {total}
            </span>
            <span className="text-[13px] text-slate-500">
              Total Courses
            </span>
          </div>

          <div className="text-center p-5 bg-slate-50 rounded-lg">
            <span className="block text-[28px] font-bold text-green-600">
              {eligibility}
            </span>
            <span className="text-[13px] text-slate-500">Eligible</span>
          </div>

          <div className="text-center p-5 bg-slate-50 rounded-lg">
            <span className="block text-[28px] font-bold text-red-600">
              {atRisk}
            </span>
            <span className="text-[13px] text-slate-500">At Risk</span>
          </div>
        </div>
      </section>

      {/* ACTION MESSAGE */}
      <div className="text-center p-5 rounded-lg border bg-slate-50 text-slate-500 text-[14px]">
        {atRisk === 0 && total > 0 ? (
          <p>Great job! Youre on track for all courses.</p>
        ) : total > 0 ? (
          <p>Focus on attending remaining classes for at-risk courses.</p>
        ) : (
          <p>Go to Timetable to add your courses.</p>
        )}
      </div>
    </main>
  );
}