// app/(dashboard)/dashboard/components/Users/ViewModal.tsx
"use client";
import React from "react";
import type { User } from "./types";
import Image from "next/image";

export default function ViewModal({
  user,
  selectedTeam,
  onChangeTeam,
  onClose,
  onReject,
  onAdd,
}: {
  user: User;
  selectedTeam: string;
  onChangeTeam: (t: string) => void;
  onClose: () => void;
  onReject: () => void;
  onAdd: () => void;
}) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  return (
    <div
      className="fixed inset-0 bg-[#00000033] flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-user-title"
    >
      <div className="bg-white rounded-lg max-w-[438px] max-h-[475px] max-sm:mx-6 relative">
        <div className="px-6 py-4 flex items-center border-b border-[#E9EDEE]">
          <h3 id="view-user-title" className="txt-24 font-semibold">
            View Request
          </h3>
          <button
            onClick={onClose}
            className="absolute right-4  "
            aria-label="Close"
          >
            <Image
              src="/dashboardIcons/CloseButton.svg" // Update this path to your PNG image
              alt="No data"
              width={32}
              height={32}
              style={{ opacity: 1 }}
            />
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-start gap-3">
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center"
              style={{ borderColor: "var(--Neutral-Grey-10,#E9EDEE)" }}
            >
              {/* <span className="text-[#51595A] txt-18 font-bold">
                {getInitials(user.name)}
              </span> */}
              <span
                  className=" txt-18"
                  style={{
                    fontFamily: "SF Pro Display, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {getInitials(user.name)}
                </span>
            </div>
            <div>
              <div className="font-semibold txt-14">{user.name}</div>
              <div className="txt-14 text-[#51595A]">{user.username}</div>
            </div>
          </div>

          <div className="mt-3 txt-14">
            <div className="font-medium">{user.phone ?? "-"}</div>
          </div>

          <div className="mt-4 txt-14">
            <div className="mt-1 txt-14 font-medium leading-5 break-words">
              {user.salesReason ?? "-"}
            </div>
          </div>

          <div className="mt-4">
            <div className="txt-14 mb-2">Team</div>
            <select
              value={selectedTeam}
              onChange={(e) => onChangeTeam(e.target.value)}
              className="w-full h-14 px-3 txt-12 bg-[#F2F5F6] text-[#626D6F] rounded-md focus:outline-none"
            >
              <option value="">Select team</option>
              <option value="team-north">North</option>
              <option value="team-south">South</option>
              <option value="team-enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-[#E9EDEE] bg-[#F2F5F6] rounded-b-2xl">
          <button
            onClick={onReject}
            className="px-4 py-2 min-w-[100px] min-h-[40px] border border-gray-300 rounded-lg txt-16 font-semibold "
          >
            Reject
          </button>
          <button
            onClick={onAdd}
            className="px-3 py-2 max-w-[166px] min-h-[40px] bg-[#25292A] text-white rounded-lg txt-16 font-semibold "
          >
            Add to Sales Team
          </button>
        </div>
      </div>
    </div>
  );
}
