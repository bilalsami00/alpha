"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SideAnimation from "../authComponents/SideAnimation";
import { GoArrowLeft } from "react-icons/go";

import { Toaster, toast } from "react-hot-toast";

export const dynamic = "force-dynamic";

function SixDigitVerifyInner() {
  const [code, setCode] = useState(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const isFormValid = () => {
    return code.every((digit) => digit !== "");
  };

  const handleResendCode = () => {
    setSecondsLeft(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value[0];
    setCode(newCode);

    if (index < 5 && value) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];

    if (e.key === "Backspace") {
      if (code[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        newCode[index - 1] = "";
        inputsRef.current[index - 1]?.focus();
      }
      setCode(newCode);
    } else if (e.key === "Delete") {
      newCode[index] = "";
      setCode(newCode);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "");
    if (pasted.length === 6) {
      const newCode = pasted.split("");
      setCode(newCode);
      inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setIsSubmitting(false);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        if (from === "signup") {
          router.push("/Dashboard"); // Navigate to dashboard
        } else if (from === "forgetpassword") {
          // router.push("new-password"); // Navigate to create password page
          console.log("Redirecting to:", "/new-password");
          router.push("/new-password");
        } else {
          router.push("/");
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto]">
      <Toaster position="top-center" />

      {/* === Content Area === */}
      <div
        className=" flex flex-col  md:flex-row md:justify-between max-sm:p-4 px-4 py-6 2xl:py-8 [@media(min-width:1600px)]:p- 
            xl:pl-10 2xl:pl-20 gap-4 md:gap-8 xl:gap-12 2xl:gap-34"
      >
        {/* Left Section */}
        <SideAnimation />

        {/* Right Section */}
        <div className="md:w-[52%] flex justify-start items-center max-sm:mt-6 max-sm:mb-20">
          <div className="w-full max-w-lg p-2 lg:px-4 bg-white rounded-3xl">
            {/* Back Button */}
            <div onClick={() => router.back()} className="cursor-pointer mb-6">
              <GoArrowLeft className="h-8 w-8" />
            </div>

            {/* Icon */}
            {/* <div className="p-2  bg-[#DD6F941F] border-[#DD6F94] border-1 rounded-xl flex items-center justify-center w-fit lg:w-15 lg:h-15 mb-6">
              <img
                src="/authIcons/password-check.png"
                alt="SMS Icon"
                className="w-10 h-10 object-contain"
              />
            </div> */}

            <h2 className="txt-32 font-semibold mb-2 text-[#25292A]">
              Verification Code
            </h2>
            <p className="txt-20 text-[#51595A] mb-6 w-full 2xl:w-[496px]">
              Enter 5 digit verification code sent to your email address.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="w-full 2xl:w-[496px] 2xl:h-[56px] flex justify-center  gap-2 lg:gap-3 mb-6">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    //   className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-14 xl:w-18 xl:h-16
                    // text-center txt-18 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-50"
                    className="w-14 h-14
                  text-center txt-18 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-50"
                  />
                ))}
              </div>

              <div className="text-center mb-6">
                {secondsLeft > 0 ? (
                  <div className="  txt-18 font-[400] leading-[100%] font-[Afacad Flux]">
                    {/* Request a new code  */}
                    0:
                    {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="text-[#51595A] txt-16   leading-[100%]   transition"
                    >
                      Didn’t receive the code?
                    </button>{" "}
                    <span
                      onClick={handleResendCode}
                      className="font-semibold txt-16 cursor-pointer"
                    >
                      Resend Code
                    </span>
                  </>
                )}
              </div>

              <button
                type="submit"
                className={`w-full txt-18 2xl:w-[496px] 2xl:h-[56px] py-3 rounded-full font-semibold transition ${
                  !isFormValid()
                    ? " bg-[#25292A] text-white cursor-not-allowed"
                    : "bg-[#25292A] text-white cursor-pointer"
                }`}
                disabled={!isFormValid()}
              >
                {/* {isSubmitting ? (
                  <img
                    src="/loader.gif"
                    alt="Loading..."
                    className="w-6 h-6 mx-auto bg-[#224674]"
                  />
                ) : ( */}
                Verify
                {/* )} */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SixDigitVerify() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SixDigitVerifyInner />
    </Suspense>
  );
}
