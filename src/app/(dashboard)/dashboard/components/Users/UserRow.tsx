// app/(dashboard)/dashboard/components/Users/UserRow.tsx
"use client";
import React, { useRef } from "react";
import { PiDotsThreeOutline } from "react-icons/pi";
import type { User } from "./types";

export default function UserRow({
  user,
  activeTab,
  getInitials,
  isMenuOpen,
  onToggleMenu,
  registerMenuRef,
  onMenuAction,
  onOpenView,
}: {
  user: User;
  activeTab: string;
  getInitials: (n: string) => string;
  isMenuOpen: boolean;
  onToggleMenu: (e?: React.MouseEvent) => void;
  registerMenuRef: (id: number, el: HTMLDivElement | null) => void;
  onMenuAction: (u: User, action: "restrict" | "delete") => void;
  onOpenView: () => void;
}) {
  const localMenuRef = useRef<HTMLDivElement | null>(null);

  return (
    <tr>
      {activeTab === "request" ? (
        <>
          <td className="px-4 py-1.5 whitespace-nowrap text-sm font-medium" style={{ width: 240, paddingLeft: "16px" }}>
            <div className="flex items-center txt-14 font-medium">
              <div className="w-11 h-11 rounded-full border flex items-center justify-center mr-3 border-[color:var(--Neutral-Grey-10,#E9EDEE)]" aria-hidden>
                <span className="text-gray-700 txt-18" style={{ fontFamily: "SF Pro Display, sans-serif", fontWeight: 700 }}>{getInitials(user.name)}</span>
              </div>

              <div className="flex flex-col max-w-[160px] overflow-hidden">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis font-medium">{user.name}</span>
                <span className="txt-12 text-[#51595A] overflow-hidden whitespace-nowrap text-ellipsis">@{user.username}</span>
              </div>
            </div>
          </td>

          <td className="px-4 py-4 whitespace-nowrap txt-14 font-medium" style={{ width: 240 }}>
            <div className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">{user.phone ?? "-"}</div>
          </td>

          <td className="px-4 py-4 txt-14 font-medium" style={{ width: 524 }}>
            <div className="max-w-[524px] overflow-hidden whitespace-nowrap text-ellipsis" title={user.salesReason ?? ""}>{user.salesReason ?? ""}</div>
          </td>

          <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium relative" style={{ width: 100, paddingRight: "16px" }}>
            <button type="button" className="text-white font-medium rounded" style={{ width: 61, height: 40, borderRadius: 8, background: "var(--Neutral-Grey-100, #25292A)" }} onClick={onOpenView}>
              View
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-1.5 whitespace-nowrap text-sm font-medium" style={{ width: "502px", paddingLeft: "16px" }}>
            <div className="flex items-center txt-14 font-medium">
              <div className="w-11 h-11 rounded-full border flex items-center justify-center mr-3 border-[color:var(--Neutral-Grey-10,#E9EDEE)]">
                <span className="text-gray-700 txt-18" style={{ fontFamily: "SF Pro Display, sans-serif", fontWeight: 700 }}>{getInitials(user.name)}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="txt-12 text-[#51595A]">@{user.username}</span>
              </div>
            </div>
          </td>

          <td className="px-4 py-4 whitespace-nowrap txt-14 font-medium " style={{ width: "502px" }}>
            {user.email}
          </td>

          <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium relative" style={{ width: "100px", paddingRight: "16px" }}>
            <div className="relative inline-block">
              <button onClick={(e) => onToggleMenu(e)} className="p-1 rounded ">
                <PiDotsThreeOutline size={20} />
              </button>

              {isMenuOpen && (
                <div
                  ref={(el) => {
                    localMenuRef.current = el;
                    registerMenuRef(user.id, el);
                  }}
                  className="absolute right-4 sm:right-8 -mt-6 sm:-mt-1 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                >
                  <div className="py-1">
                    <button onClick={() => onMenuAction(user, "restrict")} className="flex items-center w-full text-left px-4 py-2 text-sm ">
                      <img src={user.status === "active" ? "/dashboardIcons/slash-red.svg" : "/dashboardIcons/slash.svg"} alt="icon" width={20} height={20} className="mr-2" />
                      {user.status === "active" ? "Restrict" : "Unrestrict"}
                    </button>
                    <button onClick={() => onMenuAction(user, "delete")} className="flex items-center w-full text-left px-4 py-2 text-sm ">
                      <img src="/dashboardIcons/trash.svg" alt="trash" width={20} height={20} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
