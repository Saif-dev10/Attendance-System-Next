"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SocialAuth() {
  // const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timer;

    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <section className="h-screen w-full flex items-center justify-center flex-col bg-white text-black">
      <div className="w-[500px] max-[600px]:w-[380px]">
        <h1 className="text-[2rem] font-bold text-center mb-8 text-black">
          {isSignIn ? "Login with socials" : "Create Account"}
        </h1>

        {showMessage && (
          <p className="fixed top-5 right-5 opacity-100 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2 z-[999] animate-bounce">
            ✅{" "}
            {isSignIn
              ? "Login Successful!"
              : "Account Created Successfully!"}
          </p>
        )}

        <section className="flex items-center justify-center">
          <form className="w-full max-w-[500px] flex flex-col p-6 rounded-xl shadow-lg">
            <p className="text-red-500 text-center text-[1.1rem] mb-3">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/setup",
                })
              }
              className="flex justify-center items-center gap-2 py-4 bg-gray-50 hover:bg-gray-100 active:opacity-75 cursor-pointer"
            >
              <FcGoogle /> Sign in with Google
            </button>

            <p className="text-center text-[0.9rem] my-5 text-black">
              Click here to
              <span
                className="text-blue-600 cursor-pointer font-semibold hover:underline"
              >
                {isSignIn ? " Sign up" : " Sign in"}
              </span>
            </p>
          </form>
        </section>
      </div>
    </section>
  );
}