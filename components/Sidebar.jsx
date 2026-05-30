"use client";

import Link from "next/link";

export function SideBar({ isSidebarOpen, sidebarClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={sidebarClose}
        className={`fixed inset-0 bg-black/50 z-[2999] transition-opacity lg:hidden
        ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-[260px]
          flex flex-col
          text-white
          bg-gradient-to-b from-slate-800 to-slate-900
          shadow-xl
          z-[3000]
          transition-transform duration-300

          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:z-[1500]
        `}
      >
        {/* Brand */}
        <div className="px-5 py-6 flex items-center gap-3 border-b border-white/10 lg:pt-[90px]">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">
            🎓
          </div>

          <span className="text-lg font-bold flex-1">AttendTrack</span>

          <button
            onClick={sidebarClose}
            className="lg:hidden text-xl p-1"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <SidebarLink href="/setup" icon="⚙️" onClick={sidebarClose}>
            Setup
          </SidebarLink>

          <SidebarLink href="/table" icon="📅" onClick={sidebarClose}>
            Timetable
          </SidebarLink>

          <SidebarLink href="/attendance" icon="✏️" onClick={sidebarClose}>
            Attendance
          </SidebarLink>

          <SidebarLink href="/dashboard" icon="📊" onClick={sidebarClose}>
            Dashboard
          </SidebarLink>

          <SidebarLink href="/summary" icon="📋" onClick={sidebarClose}>
            Summary
          </SidebarLink>
        </nav>

        {/* Footer */}
        <div className="p-5 text-xs text-slate-400 text-center border-t border-white/10">
          Student Attendance Tracker
        </div>
      </aside>

      {/* Toggle button */}
      <button
        onClick={sidebarClose}
        className="fixed top-[13px] left-6 z-[2500] w-11 h-11 bg-white rounded-lg shadow-md flex flex-col items-center justify-center gap-[5px] lg:hidden"
      >
        <span className="w-5 h-[2px] bg-slate-700" />
        <span className="w-5 h-[2px] bg-slate-700" />
        <span className="w-5 h-[2px] bg-slate-700" />
      </button>
    </>
  );
}

function SidebarLink({ href, icon, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition"
    >
      <span className="w-6 text-center">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}