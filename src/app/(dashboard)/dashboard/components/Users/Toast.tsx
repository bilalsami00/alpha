// app/(dashboard)/dashboard/components/Users/Toast.tsx
"use client";
import React, { useEffect } from "react";

export type ToastType = "success" | "info" | "error";

export default function Toast({
  visible,
  message,
  type = "success",
  onClose,
  duration = 3000,
}: {
  visible: boolean;
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  // All icons use the same green circle (#00C47E) with white tick per your request
  const Icon = (
    <span className="flex items-center justify-center w-5 h-5 rounded-full shrink-0" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="10" fill="#00C47E" />
        <path d="M5.5 10.2l2.2 2.2L14 6.1" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute left-1/2 -translate-x-1/2 top-13 z-50"
      style={{ width: 300 }} /* width keeps exact 300px */
    >
      <div
        className="w-[300px] h-12 px-3 flex items-center gap-3 rounded-md bg-white shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] border-l-2 border-[#00C47E]"
        role="alert"
      >
        <div className="flex-shrink-0">{Icon}</div>

        <div className="flex-1 text-[14px] font-medium text-[#111827] truncate">
          {message}
        </div>

        <button
          onClick={onClose}
          aria-label="Close toast"
          className="p-1 rounded hover:bg-gray-100"
          title="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M6 18L18 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
