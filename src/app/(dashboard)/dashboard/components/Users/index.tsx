// app/(dashboard)/dashboard/components/Users/index.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import UsersTable from "./UsersTable";
import ConfirmModal from "./ConfirmModal";
import ViewModal from "./ViewModal";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { INITIAL_USERS } from "./usersData";
import type { User, UserStatus } from "./types";
import Toast, { ToastType } from "./Toast";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

export default function Users() {
  const [activeTab, setActiveTab] = useState<UserStatus>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "restrict" | "delete" | null;
    user: User | null;
    action: "restrict" | "unrestrict" | null;
  }>({ isOpen: false, type: null, user: null, action: null });

  const [viewModal, setViewModal] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  // init users and ensure username is present
  const [allUsers, setAllUsers] = useState<User[]>(
    INITIAL_USERS.map((u) => ({
      ...u,
      username: u.username ?? u.email.split("@")[0],
    }))
  );

  // Toast state + helpers
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type?: ToastType;
  }>({
    visible: false,
    message: "",
    type: "info",
  });
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (message: string, type: ToastType = "info", ms = 3000) => {
    // clear any previous timeout
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast({ visible: true, message, type });
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
      toastTimeoutRef.current = null;
    }, ms);
  };

  useEffect(() => {
    return () => {
      // cleanup timeout on unmount
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // outside click to close menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openMenuId !== null &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId]?.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  // filtering
  const filteredUsers = allUsers.filter(
    (user) =>
      user.status === activeTab &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.username ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (user.phone ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.salesReason ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  // pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
  useEffect(() => {
    if (filteredUsers.length === 0) setCurrentPage(1);
    else if (currentPage > totalPages) setCurrentPage(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredUsers.length, rowsPerPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const startItem = filteredUsers.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + rowsPerPage, filteredUsers.length);
  const totalItems = filteredUsers.length;

  const toggleMenu = (userId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenMenuId((prev) => (prev === userId ? null : userId));
  };

  const registerMenuRef = (id: number, el: HTMLDivElement | null) => {
    menuRefs.current[id] = el;
  };

  // menu actions
  const handleMenuAction = (user: User, action: "restrict" | "delete") => {
    setOpenMenuId(null);

    if (action === "restrict") {
      if (user.status === "active") {
        setModal({ isOpen: true, type: "restrict", user, action: "restrict" });
        return;
      }
      if (user.status === "restricted") {
        setAllUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: "active" } : u))
        );
        showToast("User unrestricted.", "success");
        return;
      }
      setModal({ isOpen: true, type: "restrict", user, action: "restrict" });
      return;
    }

    if (action === "delete") {
      setModal({ isOpen: true, type: "delete", user, action: null });
    }
  };

  const handleModalAction = (confirm: boolean) => {
    if (!confirm) {
      setModal({ isOpen: false, type: null, user: null, action: null });
      return;
    }
    if (!modal.user) {
      setModal({ isOpen: false, type: null, user: null, action: null });
      return;
    }

    if (modal.type === "restrict" && modal.action === "restrict") {
      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === modal.user!.id ? { ...u, status: "restricted" } : u
        )
      );
      showToast("User restricted.", "success");
    } else if (modal.type === "delete") {
      setAllUsers((prev) => prev.filter((u) => u.id !== modal.user!.id));
      showToast("User deleted.", "success");
    }

    setModal({ isOpen: false, type: null, user: null, action: null });
  };

  // view modal actions
  const openViewModal = (user: User) => {
    setSelectedTeam("");
    setViewModal({ isOpen: true, user });
  };
  const closeViewModal = () => setViewModal({ isOpen: false, user: null });

  const handleRejectFromView = (userId: number) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
    closeViewModal();
    showToast("Request rejected.", "info");
  };
  const handleAddToSalesTeam = (userId: number, team?: string | null) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "active" } : u))
    );
    closeViewModal();
    showToast("Request accepted.", "success");
  };

  const emptyStateCopy = {
    active: {
      title: "No active users yet",
      subtitle: "Once users are added and activated, they’ll appear here.",
    },
    restricted: {
      title: "No restricted users",
      subtitle:
        "All your users currently have access to Alpha Arc. Restricted users will appear here.",
    },
    request: {
      title: "No Sales Requests Yet",
      subtitle:
        "Once a user applies for sales team access from the app, their request will appear here for your review.",
    },
  } as const;

  const salesHeaderStyles = {
    basePadding: {
      paddingTop: "12px",
      paddingRight: "16px",
      paddingBottom: "12px",
      paddingLeft: "16px",
    },
  } as const;

  return (
    <div className="w-full">
      {/* toast */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type ?? "info"}
        onClose={() => setToast((s) => ({ ...s, visible: false }))}
      />

      {/* Heading */}
      <h2 className="txt-24 font-semibold mb-6 sm:ml- 6 sm:mt-12">Users</h2>

      {/* Tabs */}
      <div
        className="flex mb-6 sm:ml- 6 sm:gap-4 w-auto md:max-w-[440px] text-[#51595A]"
        role="tablist"
        aria-label="User tabs"
      >
        <button
          role="tab"
          aria-pressed={activeTab === "active"}
          onClick={() => {
            setActiveTab("active");
            setCurrentPage(1);
          }}
          className={`flex-1 text-center whitespace-nowrap px-4 py-2 txt-12 font-medium border-b-2 ${
            activeTab === "active"
              ? "border-brand  bg-transparent text-[#333839]"
              : "border-transparent text-[#51595A]"
          }`}
        >
          Active Users
        </button>
        <button
          role="tab"
          aria-pressed={activeTab === "restricted"}
          onClick={() => {
            setActiveTab("restricted");
            setCurrentPage(1);
          }}
          className={`flex-1 text-center whitespace-nowrap px-4 py-2 txt-12 font-medium border-b-2 ${
            activeTab === "restricted"
              ? "border-brand  bg-transparent text-[#333839]"
              : "border-transparent text-[#51595A]"
          }`}
        >
          Restricted Users
        </button>
        <button
          role="tab"
          aria-pressed={activeTab === "request"}
          onClick={() => {
            setActiveTab("request");
            setCurrentPage(1);
          }}
          className={`flex-1 text-center whitespace-nowrap px-4 py-2 txt-12 font-medium border-b-2 ${
            activeTab === "request"
              ? "border-brand  bg-transparent text-[#333839]"
              : "border-transparent text-[#51595A]"
          }`}
        >
          Sales Tab Request
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 sm:ml- 6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Table */}
      <UsersTable
        users={paginatedUsers}
        activeTab={activeTab}
        getInitials={getInitials}
        onToggleMenu={toggleMenu}
        openMenuId={openMenuId}
        registerMenuRef={registerMenuRef}
        onMenuAction={handleMenuAction}
        onOpenView={openViewModal}
        emptyStateCopy={emptyStateCopy}
        salesHeaderStyles={salesHeaderStyles}
        totalItems={totalItems}
      />

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="sm:ml- 6 mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(n) => {
              setRowsPerPage(n);
              setCurrentPage(1);
            }}
            totalItems={totalItems}
          />
        </div>
      )}

      {/* Confirm modal */}
      {modal.isOpen && modal.user && (
        <ConfirmModal
          type={modal.type!}
          user={modal.user}
          onCancel={() =>
            setModal({ isOpen: false, type: null, user: null, action: null })
          }
          onConfirm={() => handleModalAction(true)}
        />
      )}

      {/* View modal */}
      {viewModal.isOpen && viewModal.user && (
        <ViewModal
          user={viewModal.user}
          selectedTeam={selectedTeam}
          onChangeTeam={(t) => setSelectedTeam(t)}
          onClose={closeViewModal}
          onReject={() => handleRejectFromView(viewModal.user!.id)}
          onAdd={() => handleAddToSalesTeam(viewModal.user!.id, selectedTeam)}
        />
      )}
    </div>
  );
}
