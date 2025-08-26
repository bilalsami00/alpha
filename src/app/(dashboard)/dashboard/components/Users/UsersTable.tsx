// app/(dashboard)/dashboard/components/Users/UsersTable.tsx
"use client";
import React from "react";
import type { User } from "./types";
import UserRow from "./UserRow";
import { GoPeople } from "react-icons/go";

import Image from "next/image";

export default function UsersTable({
  users,
  activeTab,
  getInitials,
  onToggleMenu,
  openMenuId,
  registerMenuRef,
  onMenuAction,
  onOpenView,
  emptyStateCopy,
  salesHeaderStyles,
  totalItems,
}: {
  users: User[];
  activeTab: string;
  getInitials: (name: string) => string;
  onToggleMenu: (id: number, e?: React.MouseEvent) => void;
  openMenuId: number | null;
  registerMenuRef: (id: number, el: HTMLDivElement | null) => void;
  onMenuAction: (u: User, action: "restrict" | "delete") => void;
  onOpenView: (u: User) => void;
  emptyStateCopy: any;
  salesHeaderStyles: any;
  totalItems: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-auto sm:ml- 6">
      <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
        <thead className="bg-[#E9EDEE]">
          <tr>
            {activeTab === "request" ? (
              <>
                <th scope="col" className="text-left txt-14 font-medium tracking-wider" style={{ width: 240, height: 44, gap: 10, opacity: 1, ...salesHeaderStyles.basePadding, textAlign: "left" }}>
                  Full name
                </th>
                <th scope="col" className="text-left txt-14 font-medium tracking-wider" style={{ width: 240, height: 44, gap: 10, opacity: 1, ...salesHeaderStyles.basePadding, textAlign: "left" }}>
                  Phone number
                </th>
                <th scope="col" className="text-left txt-14 font-medium tracking-wider" style={{ width: 524, height: 44, gap: 10, opacity: 1, ...salesHeaderStyles.basePadding, textAlign: "left" }}>
                  Why do you want to do sales ?
                </th>
                <th scope="col" className="text-center txt-14 font-medium tracking-wider" style={{ width: 100, height: 44, gap: 10, opacity: 1, ...salesHeaderStyles.basePadding, textAlign: "center" }}>
                  Action
                </th>
              </>
            ) : (
              <>
                <th scope="col" className="px-4 py-3 text-left txt-14 font-medium tracking-wider" style={{ paddingLeft: "16px" }}>Name</th>
                <th scope="col" className="px-4 py-3 text-left txt-14 font-medium tracking-wider">Email</th>
                <th scope="col" className="px-4 py-3 text-center txt-14 font-medium tracking-wider" style={{ paddingRight: "16px" }}>Action</th>
              </>
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan={activeTab === "request" ? 4 : 3} className="p-0">
                <div className="w-full flex items-center justify-center" style={{ height: 616 }} role="status" aria-live="polite">
                  <div className="flex flex-col items-center justify-center" style={{ width: 357 }}>
                    <div className="w-16 h-16 rounded-full   flex items-center justify-center">
                      {/* <GoPeople size={32} className="text-brand" /> */}
                      {/* // Then replace the GoPeople icon with this Image component */}
                      <div className="w-16 h-16 rounded-full  flex items-center justify-center">
                        <Image 
                          src="/dashboardIcons/empty-user-2.svg" // Update this path to your PNG image
                          alt="No data" 
                          width={64}
                          height={64}
                          style={{ opacity: 1 }}
                        />
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <div className="text-[24px] leading-[32px] font-semibold ">{emptyStateCopy[activeTab].title}</div>
                      <div className="text-[16px] leading-[24px] font-medium text-text-col mt-2" style={{ opacity: 1 }}>{emptyStateCopy[activeTab].subtitle}</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                activeTab={activeTab}
                getInitials={getInitials}
                isMenuOpen={openMenuId === user.id}
                onToggleMenu={(e) => onToggleMenu(user.id, e)}
                registerMenuRef={registerMenuRef}
                onMenuAction={onMenuAction}
                onOpenView={() => onOpenView(user)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
