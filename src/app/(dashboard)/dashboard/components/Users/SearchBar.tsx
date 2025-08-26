"use client";
import React from "react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (s: string) => void; }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-4 txt-14 placeholder-[#626D6F] py-2 border border-gray-200 rounded-md focus:outline-none  "
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <img src="/dashboardIcons/search-normal.svg" alt="Search" className="w-6 h-6" />
      </div>
    </div>
  );
}
