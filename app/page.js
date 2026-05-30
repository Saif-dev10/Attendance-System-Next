"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="font-sans text-[#1a1a1a] bg-white leading-relaxed transition-all duration-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1a1a1a] text-white rounded-lg flex items-center justify-center text-base font-bold">
              A
            </div>
            <span className="text-lg font-bold tracking-tight">
              Attendance Tracker
            </span>
          </div>

          <div className="hidden md:flex gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-500 hover:text-[#1a1a1a]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-500 hover:text-[#1a1a1a]"
            >
              How it works
            </a>
          </div>

          <button
            onClick={() => router.push("/form")}
            className="px-5 py-2.5 bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-[#333] active:opacity-75 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 bg-[#fafafa] relative">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-sm text-gray-500 mb-6">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Free for students
            </div>

            <h1 className="text-5xl md:text-[56px] font-extrabold leading-tight tracking-tight mb-5">
              Attendance tracking
              <br />
              that just works
            </h1>

            <p className="text-lg text-gray-500 max-w-[420px] mx-auto md:mx-0 mb-8">
              Know exactly where you stand. No spreadsheets, no guesswork, no
              surprises before exams.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={() => router.push("/form")}
                className="px-7 py-3.5 bg-[#1a1a1a] text-white rounded-xl font-semibold hover:bg-[#333] active:opacity-75 cursor-pointer"
              >
                Start Tracking
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 bg-white rounded-xl font-semibold hover:bg-gray-200 active:opacity-75 cursor-pointer transition"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Demo Card */}
          <div className="flex justify-center md:order-none order-first">
            <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 px-5 bg-[#fafafa] flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-gray-400 font-semibold">
                  Today — Monday
                </span>
              </div>

              <div className="p-4 space-y-2">
                {[
                  ["Calculus II", "9:00 AM · Present", "92%", true],
                  ["Physics Lab", "11:00 AM · Present", "88%", true],
                  ["Organic Chemistry", "2:00 PM · Pending", "71%", false],
                ].map(([name, meta, percent, done], i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      done ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        done
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {done ? "✓" : "○"}
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold text-sm">{name}</div>
                      <div className="text-xs text-gray-400">{meta}</div>
                    </div>

                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        done
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {percent}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 px-5 bg-[#fafafa] flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">2/3</span>
                  <span className="text-[11px] uppercase text-gray-400">
                    Marked
                  </span>
                </div>

                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-[#1a1a1a]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-extrabold mb-3">
              Everything you need
            </h2>
            <p className="text-lg text-gray-500">
              Built for students who take their attendance seriously.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              [
                "01",
                "Set once, track forever",
                "Enter your semester dates and timetable once. We handle the rest — daily class lists, progress tracking, and deadline warnings.",
              ],
              [
                "02",
                "One tap attendance",
                "Mark present or absent in under a second. No forms, no friction. Just tap and you're done.",
              ],
              [
                "03",
                "Know your status",
                "Real-time percentages for every course. Green means safe, red means act now. No surprises at exam time.",
              ],
              [
                "04",
                "Smart reminders",
                "Missed a class? Dropping below 75? We notify you before it becomes a problem, not after.",
              ],
            ].map(([num, title, desc]) => (
              <div key={num} className="p-10 bg-[#fafafa] rounded-2xl">
                <div className="text-sm font-bold text-gray-300 mb-4">
                  {num}
                </div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-gray-500 leading-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-28 px-6 bg-[#fafafa]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold mb-3">How it works</h2>
            <p className="text-lg text-gray-500">
              Three steps. Two minutes. Zero complexity.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {[
              [
                "1",
                "Set your semester",
                "Start date, end date, exam date. That's all we need.",
              ],
              [
                "2",
                "Add your courses",
                "Name, day, time. Build your weekly schedule in seconds.",
              ],
              [
                "3",
                "Track daily",
                "Open, tap, done. We'll do the math and keep you informed.",
              ],
            ].map(([num, title, desc], index) => (
              <div
                key={num}
                className="flex items-center flex-col md:flex-row"
              >
                <div className="max-w-[280px] text-center p-10">
                  <div className="w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5">
                    {num}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{title}</h4>
                  <p className="text-gray-500">{desc}</p>
                </div>

                {index < 2 && (
                  <div className="hidden md:block w-16 h-[2px] bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-center gap-20 text-center">
          {[
            ["10,000+", "Students tracking"],
            ["98%", "Say it helped"],
            ["0", "Data collected"],
          ].map(([num, desc]) => (
            <div key={num}>
              <div className="text-5xl font-extrabold text-white">{num}</div>
              <div className="text-gray-400">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center bg-white">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-5xl font-extrabold mb-4">
            Stop guessing. Start knowing.
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Your attendance data stays on your device. No accounts, no cloud, no
            tracking.
          </p>

          <button
            onClick={() => router.push("/form")}
            className="px-8 py-4 bg-[#1a1a1a] text-white rounded-xl font-semibold active:opacity-75 cursor-pointer"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-10 px-6 bg-[#fafafa]">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-bold">
              <div className="w-8 h-8 bg-[#1a1a1a] text-white rounded-lg flex items-center justify-center">
                A
              </div>
              Attendance Tracker
            </div>
            <p className="text-sm text-gray-400">
              Student attendance tracking, simplified.
            </p>
          </div>

          <span className="text-sm text-gray-400">
            © {new Date().getFullYear()} Attendance Tracker
          </span>
        </div>
      </footer> */}
    </div>
  );
}