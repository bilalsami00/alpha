// app/(dashboard)/dashboard/components/Users/ConfirmModal.tsx
"use client";
import React from "react";
import type { User } from "./types";

export default function ConfirmModal({ type, user, onCancel, onConfirm }: { type: "restrict" | "delete"; user: User; onCancel: () => void; onConfirm: () => void; }) {
  return (
    <div className="fixed inset-0 bg-[#00000033] flex items-center justify-center z-50" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="bg-white rounded-lg p-7.5 w-96 sm:w-133">
        <button onClick={onCancel} className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <h3 className="txt-18 font-semibold mb-4">{type === "restrict" ? `Confirm Restrict` : "Confirm Delete"}</h3>
        <p className="txt-16 font-normal mb-6">{type === "restrict" ? `Are you sure you want to restrict ${user.name}?` : `Are you sure you want to delete ${user.name}? This action cannot be undone.`}</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 txt-16 font-semibold text-gray-700 hover:bg-gray-100 rounded-md">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 txt-16 font-semibold text-white rounded-lg bg-[#F14D4D]">{type === "restrict" ? "Restrict" : "Delete"}</button>
        </div>
      </div>
    </div>
  );
}
