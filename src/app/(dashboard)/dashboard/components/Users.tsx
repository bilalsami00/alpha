// old original code and broken down in to components on 26August2025
// app/dashboard/components/Users.tsx
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { PiDotsThreeOutline } from "react-icons/pi";
// import { GoPeople } from "react-icons/go";

// interface User {
//   id: number;
//   name: string;
//   username?: string;
//   email: string;
//   status: "active" | "restricted" | "request";
//   phone?: string;
//   salesReason?: string; // Why do you want to do sales?
// }

// // Helper function to get initials from name
// const getInitials = (name: string) => {
//   return name
//     .split(" ")
//     .map((part) => part.charAt(0).toUpperCase())
//     .join("")
//     .slice(0, 2);
// };

// export default function Users() {
//   const [activeTab, setActiveTab] = useState<
//     "active" | "restricted" | "request"
//   >("active");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openMenuId, setOpenMenuId] = useState<number | null>(null);
//   const [modal, setModal] = useState<{
//     isOpen: boolean;
//     type: "restrict" | "delete" | null;
//     user: User | null;
//     action: "restrict" | "unrestrict" | null;
//   }>({
//     isOpen: false,
//     type: null,
//     user: null,
//     action: null,
//   });

//   // NEW: view modal state for "View" popup
//   const [viewModal, setViewModal] = useState<{
//     isOpen: boolean;
//     user: User | null;
//   }>({
//     isOpen: false,
//     user: null,
//   });
//   const [selectedTeam, setSelectedTeam] = useState<string>("");

//   const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

//   // Close menu when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         openMenuId !== null &&
//         menuRefs.current[openMenuId] &&
//         !menuRefs.current[openMenuId]?.contains(event.target as Node)
//       ) {
//         setOpenMenuId(null);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openMenuId]);

//   // INITIAL USERS (moved to state so UI updates)
//   const INITIAL_USERS: User[] = [
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       status: "active",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       status: "active",
//     },
//     {
//       id: 3,
//       name: "Robert Johnson",
//       email: "robert.j@example.com",
//       status: "active",
//     },
//     {
//       id: 4,
//       name: "Sarah Wilson",
//       email: "sarah.w@example.com",
//       status: "active",
//     },
//     {
//       id: 5,
//       name: "Michael Brown",
//       email: "michael.b@example.com",
//       status: "active",
//     },
//     {
//       id: 6,
//       name: "Emily Davis",
//       email: "emily.d@example.com",
//       status: "active",
//     },
//     {
//       id: 7,
//       name: "David Miller",
//       email: "david.m@example.com",
//       status: "active",
//     },
//     {
//       id: 8,
//       name: "Jessica Taylor",
//       email: "jessica.t@example.com",
//       status: "active",
//     },
//     {
//       id: 9,
//       name: "Daniel Anderson",
//       email: "daniel.a@example.com",
//       status: "active",
//     },
//     {
//       id: 10,
//       name: "Jennifer Thomas",
//       email: "jennifer.t@example.com",
//       status: "active",
//     },
//     {
//       id: 11,
//       name: "Christopher Martinez",
//       email: "chris.m@example.com",
//       status: "restricted",
//     },
//     {
//       id: 12,
//       name: "Amanda Clark",
//       email: "amanda.c@example.com",
//       status: "restricted",
//     },
//     {
//       id: 13,
//       name: "Matthew Rodriguez",
//       email: "matt.r@example.com",
//       status: "restricted",
//     },

//     // request users (sales tab) — added phone & salesReason so truncation can be seen
//     {
//       id: 14,
//       name: "Elizabeth Lewis",
//       email: "elizabeth.l@example.com",
//       status: "request",
//       phone: "+92 300 1234567",
//       salesReason:
//         "I want to join sales because I enjoy client interaction and I'm great at closing complex deals — I also have experience with B2B SaaS solutions and consistently exceed targets.",
//     },
//     {
//       id: 15,
//       name: "James Lee",
//       email: "james.l@example.com",
//       status: "request",
//       phone: "+92 301 7654321",
//       salesReason:
//         "Passionate about product-led growth and customer success; I believe sales is a chance to solve problems by pairing the right customers with the right product.",
//     },
//     {
//       id: 16,
//       name: "Olivia Walker",
//       email: "olivia.w@example.com",
//       status: "request",
//       phone: "+92 302 5554444",
//       salesReason:
//         "I have a background in retail and inside sales; I'm motivated by targets and building long-term relationships.",
//     },
//     {
//       id: 17,
//       name: "Andrew Hall",
//       email: "andrew.h@example.com",
//       status: "request",
//       phone: "+92 303 1112222",
//       salesReason:
//         "Seeking to move into a consultative sales role to better leverage my product knowledge and negotiation skills for enterprise deals.",
//     },
//     {
//       id: 18,
//       name: "Sophia Allen",
//       email: "sophia.a@example.com",
//       status: "request",
//       phone: "+92 304 3332221",
//       salesReason:
//         "I love meeting new people and solving their problems — sales lets me combine empathy with commercial outcomes.",
//     },
//     {
//       id: 19,
//       name: "Joshua Young",
//       email: "joshua.y@example.com",
//       status: "request",
//       phone: "+92 305 4443332",
//       salesReason:
//         "Transitioning from customer success to sales to have direct impact on growth.",
//     },
//     {
//       id: 20,
//       name: "Isabella Hernandez",
//       email: "isabella.h@example.com",
//       status: "request",
//       phone: "+92 306 7778889",
//       salesReason:
//         "I have a proven track record in regional sales and would like to scale those skills to digital products.",
//     },

//     // additional entries (21-40) kept same, with some request users having salesReason for demonstration
//     {
//       id: 21,
//       name: "Ethan King",
//       email: "ethan.k@example.com",
//       status: "active",
//     },
//     { id: 22, name: "Mia Scott", email: "mia.s@example.com", status: "active" },
//     {
//       id: 23,
//       name: "Alexander Green",
//       email: "alex.g@example.com",
//       status: "active",
//     },
//     {
//       id: 24,
//       name: "Charlotte Adams",
//       email: "charlotte.a@example.com",
//       status: "active",
//     },
//     {
//       id: 25,
//       name: "Benjamin Nelson",
//       email: "ben.n@example.com",
//       status: "active",
//     },
//     {
//       id: 26,
//       name: "Ava Carter",
//       email: "ava.c@example.com",
//       status: "active",
//     },
//     {
//       id: 27,
//       name: "Logan Mitchell",
//       email: "logan.m@example.com",
//       status: "restricted",
//     },
//     {
//       id: 28,
//       name: "Harper Perez",
//       email: "harper.p@example.com",
//       status: "restricted",
//     },
//     {
//       id: 29,
//       name: "Elijah Roberts",
//       email: "elijah.r@example.com",
//       status: "restricted",
//     },
//     {
//       id: 30,
//       name: "Amelia Turner",
//       email: "amelia.t@example.com",
//       status: "restricted",
//     },
//     {
//       id: 31,
//       name: "Mason Phillips",
//       email: "mason.p@example.com",
//       status: "restricted",
//     },
//     {
//       id: 32,
//       name: "Luna Campbell",
//       email: "luna.c@example.com",
//       status: "restricted",
//     },
//     {
//       id: 33,
//       name: "Oliver Parker",
//       email: "oliver.p@example.com",
//       status: "request",
//       phone: "+92 307 0001112",
//       salesReason:
//         "Interested because I want to drive sales in my city and help small businesses succeed with our product.",
//     },
//     {
//       id: 34,
//       name: "Chloe Evans",
//       email: "chloe.e@example.com",
//       status: "request",
//       phone: "+92 308 2223334",
//       salesReason:
//         "Long-form explanation that will be truncated in the UI to show 'online and truncated' behavior. I have experience with lead qualification and inbound conversion.",
//     },
//     {
//       id: 35,
//       name: "Henry Edwards",
//       email: "henry.e@example.com",
//       status: "request",
//       phone: "+92 309 4445556",
//       salesReason: "Short reason",
//     },
//     {
//       id: 36,
//       name: "Grace Collins",
//       email: "grace.c@example.com",
//       status: "request",
//       phone: "+92 310 6667778",
//       salesReason: "I love sales",
//     },
//     {
//       id: 37,
//       name: "Jack Stewart",
//       email: "jack.s@example.com",
//       status: "request",
//       phone: "+92 311 8889990",
//       salesReason: "Looking for growth",
//     },
//     {
//       id: 38,
//       name: "Ella Morris",
//       email: "ella.m@example.com",
//       status: "request",
//       phone: "+92 312 1212121",
//       salesReason: "Interested",
//     },
//     {
//       id: 39,
//       name: "Lucas Rogers",
//       email: "lucas.r@example.com",
//       status: "request",
//       phone: "+92 313 3434343",
//       salesReason: "Experienced rep",
//     },
//     {
//       id: 40,
//       name: "Lily Cook",
//       email: "lily.c@example.com",
//       status: "request",
//       phone: "+92 314 5656565",
//       salesReason: "Eager to join",
//     },
//   ];

//   // initialize state and ensure every user has a username (derived from email if missing)
//   const [allUsers, setAllUsers] = useState<User[]>(
//     INITIAL_USERS.map((u) => ({
//       ...u,
//       username: u.username ?? u.email.split("@")[0],
//     }))
//   );

//   // Filter users based on active tab and search query
//   const filteredUsers = allUsers.filter(
//     (user) =>
//       user.status === activeTab &&
//       (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (user.username ?? "")
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         (user.phone ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (user.salesReason ?? "")
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()))
//   );

//   // Pagination
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedUsers = filteredUsers.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );
//   const startItem = filteredUsers.length === 0 ? 0 : startIndex + 1;
//   const endItem = Math.min(startIndex + rowsPerPage, filteredUsers.length);
//   const totalItems = filteredUsers.length;

//   useEffect(() => {
//     if (totalPages === 0) {
//       setCurrentPage(1);
//     } else if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [totalPages, rowsPerPage, filteredUsers.length]);

//   // Handlers
//   const handlePageChange = (newPage: number) => {
//     if (newPage < 1) return;
//     if (totalPages > 0 && newPage > totalPages) return;
//     setCurrentPage(newPage);
//   };

//   const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const toggleMenu = (userId: number, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setOpenMenuId(openMenuId === userId ? null : userId);
//   };

//   // Updated: unrestrict happens immediately (no modal). Restrict & delete still confirm.
//   const handleMenuAction = (user: User, action: "restrict" | "delete") => {
//     setOpenMenuId(null);

//     if (action === "restrict") {
//       // If user is active → we're restricting them: show confirmation modal
//       if (user.status === "active") {
//         setModal({
//           isOpen: true,
//           type: "restrict",
//           user,
//           action: "restrict",
//         });
//         return;
//       }

//       // If user is restricted → unrestrict immediately (no modal)
//       if (user.status === "restricted") {
//         setAllUsers((prev) =>
//           prev.map((u) => (u.id === user.id ? { ...u, status: "active" } : u))
//         );
//         console.log(`User ${user.name} has been unrestricted.`);
//         return;
//       }

//       // For 'request' users, treat as restrict -> show modal
//       setModal({
//         isOpen: true,
//         type: "restrict",
//         user,
//         action: "restrict",
//       });
//       return;
//     }

//     // Delete always needs confirmation
//     if (action === "delete") {
//       setModal({
//         isOpen: true,
//         type: "delete",
//         user,
//         action: null,
//       });
//     }
//   };

//   // Updated: modal confirms restrict or delete (unrestrict is immediate)
//   const handleModalAction = (confirm: boolean) => {
//     if (!confirm) {
//       setModal({ isOpen: false, type: null, user: null, action: null });
//       return;
//     }

//     if (!modal.user) {
//       setModal({ isOpen: false, type: null, user: null, action: null });
//       return;
//     }

//     if (modal.type === "restrict" && modal.action === "restrict") {
//       // Restrict the user (active -> restricted)
//       setAllUsers((prev) =>
//         prev.map((u) =>
//           u.id === modal.user!.id ? { ...u, status: "restricted" } : u
//         )
//       );
//       console.log(`User ${modal.user.name} has been restricted.`);
//     } else if (modal.type === "delete") {
//       // Delete user
//       setAllUsers((prev) => prev.filter((u) => u.id !== modal.user!.id));
//       console.log(`User ${modal.user.name} has been deleted.`);
//     }

//     // Close modal
//     setModal({
//       isOpen: false,
//       type: null,
//       user: null,
//       action: null,
//     });
//   };

//   // NEW: open view modal
//   const openViewModal = (user: User) => {
//     setSelectedTeam(""); // reset team select
//     setViewModal({ isOpen: true, user });
//   };
//   const closeViewModal = () => setViewModal({ isOpen: false, user: null });

//   // NEW: Reject (we'll delete request) and Add to Sales Team (set active)
//   const handleRejectFromView = (userId: number) => {
//     setAllUsers((prev) => prev.filter((u) => u.id !== userId));
//     closeViewModal();
//     console.log(`User ${userId} rejected (deleted).`);
//   };
//   const handleAddToSalesTeam = (userId: number, team?: string | null) => {
//     setAllUsers((prev) =>
//       prev.map((u) => (u.id === userId ? { ...u, status: "active" } : u))
//     );
//     closeViewModal();
//     console.log(`User ${userId} added to sales team: ${team ?? "Default"}`);
//   };

//   // Empty-state content per tab
//   const emptyStateCopy = {
//     active: {
//       title: "No active users yet",
//       subtitle: "Once users are added and activated, they’ll appear here.",
//     },
//     restricted: {
//       title: "No restricted users",
//       subtitle:
//         "All your users currently have access to Alpha Arc. Restricted users will appear here.",
//     },
//     request: {
//       title: "No Sales Requests Yet",
//       subtitle:
//         "Once a user applies for sales team access from the app, their request will appear here for your review.",
//     },
//   } as const;

//   // Styles for Sales tab headers (as requested)
//   const salesHeaderStyles = {
//     basePadding: {
//       paddingTop: "12px",
//       paddingRight: "16px",
//       paddingBottom: "12px",
//       paddingLeft: "16px",
//     },
//   } as const;

//   return (
//     <div className="w-full">
//       {/* Heading */}
//       <h2 className="txt-24 font-semibold mb-6 sm:ml-6 sm:mt-12">Users</h2>

//       {/* Tabs */}
//       <div
//         className="flex mb-6 sm:ml-6 sm:gap-4 w-auto md:max-w-[440px]"
//         role="tablist"
//         aria-label="User tabs"
//       >
//         <button
//           role="tab"
//           aria-pressed={activeTab === "active"}
//           onClick={() => {
//             setActiveTab("active");
//             setCurrentPage(1);
//           }}
//           className={`flex-1 text-center whitespace-nowrap px-4 py-2 txt-12 font-medium border-b-2 ${
//             activeTab === "active"
//               ? "border-brand  bg-transparent text-[#333839]"
//               : "border-transparent text-[#51595A]"
//           }`}
//         >
//           Active Users
//         </button>

//         <button
//           role="tab"
//           aria-pressed={activeTab === "restricted"}
//           onClick={() => {
//             setActiveTab("restricted");
//             setCurrentPage(1);
//           }}
//           className={`flex-1 text-center whitespace-nowrap px-4 py-2 txt-12 font-medium border-b-2 ${
//             activeTab === "restricted"
//               ? "border-brand  bg-transparent text-[#333839]"
//               : "border-transparent text-[#51595A]"
//           }`}
//         >
//           Restricted Users
//         </button>

//         <button
//           role="tab"
//           aria-pressed={activeTab === "request"}
//           onClick={() => {
//             setActiveTab("request");
//             setCurrentPage(1);
//           }}
//           className={`flex-1 text-center whitespace-nowrap px-4 py-2 txt-12 font-medium border-b-2 ${
//             activeTab === "request"
//               ? "border-brand  bg-transparent text-[#333839]"
//               : "border-transparent text-[#51595A]"
//           }`}
//         >
//           Sales Tab Request
//         </button>
//       </div>

//       {/* Search Input */}
//       <div className="mb-4 sm:ml-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search users, phone or reason"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full h-10 px-4 txt-14 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//             <img
//               src="/dashboardIcons/search-normal.svg"
//               alt="Search"
//               width={24}
//               height={24}
//               className="w-6 h-6"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-auto sm:ml-6">
//         <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
//           {/* Sales tab header (different columns) */}
//           <thead className="bg-[#E9EDEE]">
//             <tr>
//               {activeTab === "request" ? (
//                 <>
//                   {/* Full name */}
//                   <th
//                     scope="col"
//                     className="text-left txt-14 font-medium tracking-wider"
//                     style={{
//                       width: 240,
//                       height: 44,
//                       gap: 10,
//                       opacity: 1,
//                       ...salesHeaderStyles.basePadding,
//                       textAlign: "left",
//                     }}
//                   >
//                     Full name
//                   </th>

//                   {/* Phone number */}
//                   <th
//                     scope="col"
//                     className="text-left txt-14 font-medium tracking-wider"
//                     style={{
//                       width: 240,
//                       height: 44,
//                       gap: 10,
//                       opacity: 1,
//                       ...salesHeaderStyles.basePadding,
//                       textAlign: "left",
//                     }}
//                   >
//                     Phone number
//                   </th>

//                   {/* Why do you want to do sales? */}
//                   <th
//                     scope="col"
//                     className="text-left txt-14 font-medium tracking-wider"
//                     style={{
//                       width: 524,
//                       height: 44,
//                       gap: 10,
//                       opacity: 1,
//                       ...salesHeaderStyles.basePadding,
//                       textAlign: "left",
//                     }}
//                   >
//                     Why do you want to do sales ?
//                   </th>

//                   {/* Action (NO header View button anymore) */}
//                   <th
//                     scope="col"
//                     className="text-center txt-14 font-medium tracking-wider"
//                     style={{
//                       width: 100,
//                       height: 44,
//                       gap: 10,
//                       opacity: 1,
//                       ...salesHeaderStyles.basePadding,
//                       textAlign: "center",
//                     }}
//                   >
//                     Action
//                   </th>
//                 </>
//               ) : (
//                 // default header for active & restricted users (Name / Email / Action)
//                 <>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left txt-14 font-medium tracking-wider"
//                     style={{ paddingLeft: "16px" }}
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left txt-14 font-medium tracking-wider"
//                   >
//                     Email
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-center txt-14 font-medium tracking-wider"
//                     style={{ paddingRight: "16px" }}
//                   >
//                     Action
//                   </th>
//                 </>
//               )}
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {/* full-height empty state when no users for the tab */}
//             {paginatedUsers.length === 0 ? (
//               <tr>
//                 <td colSpan={activeTab === "request" ? 4 : 3} className="p-0">
//                   <div
//                     className="w-full flex items-center justify-center"
//                     // Figma sizes: width 1136 x height 616 + gap 10
//                     style={{ height: 616, gap: 10 }}
//                     role="status"
//                     aria-live="polite"
//                   >
//                     <div
//                       className="flex flex-col items-center justify-center"
//                       style={{ width: 1136, gap: 10 }}
//                     >
//                       <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center">
//                         <GoPeople size={32} className="text-white" />
//                       </div>

//                       <div className="text-center mt-4">
//                         <div
//                           className="text-[24px] leading-[32px] font-semibold text-text-col"
//                           style={{ letterSpacing: "0.5%" }}
//                         >
//                           {emptyStateCopy[activeTab].title}
//                         </div>
//                         <div
//                           className="text-[16px] leading-[24px] font-medium text-text-col mt-2"
//                           style={{ opacity: 1 }}
//                         >
//                           {emptyStateCopy[activeTab].subtitle}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               paginatedUsers.map((user) => (
//                 <tr key={user.id}>
//                   {activeTab === "request" ? (
//                     <>
//                       {/* Full name */}
//                       <td
//                         className="px-4 py-1.5 whitespace-nowrap text-sm font-medium"
//                         style={{ width: 240, paddingLeft: "16px" }}
//                       >
//                         <div className="flex items-center txt-14 font-medium">
//                           <div
//                             className="w-11 h-11 rounded-full border flex items-center justify-center mr-3 border-[color:var(--Neutral-Grey-10,#E9EDEE)]"
//                             aria-hidden
//                           >
//                             <span
//                               className="text-gray-700 txt-18"
//                               style={{
//                                 fontFamily: "SF Pro Display, sans-serif",
//                                 fontWeight: 700,
//                                 lineHeight: "20px",
//                                 letterSpacing: "0px",
//                               }}
//                             >
//                               {getInitials(user.name)}
//                             </span>
//                           </div>

//                           <div className="flex flex-col max-w-[160px] overflow-hidden">
//                             <span className="overflow-hidden whitespace-nowrap text-ellipsis font-medium">
//                               {user.name}
//                             </span>
//                             <span className="txt-12 text-[#51595A] overflow-hidden whitespace-nowrap text-ellipsis">
//                               @{user.username}
//                             </span>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Phone number */}
//                       <td
//                         className="px-4 py-4 whitespace-nowrap txt-14 font-medium"
//                         style={{ width: 240 }}
//                       >
//                         <div className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
//                           {user.phone ?? "-"}
//                         </div>
//                       </td>

//                       {/* Sales reason (truncated) */}
//                       <td
//                         className="px-4 py-4 txt-14 font-medium"
//                         style={{ width: 524 }}
//                       >
//                         <div
//                           className="max-w-[524px]  overflow-hidden whitespace-nowrap text-ellipsis"
//                           title={user.salesReason ?? ""}
//                         >
//                           {user.salesReason ?? ""}
//                         </div>
//                       </td>

//                       {/* Action (view button per row) */}
//                       <td
//                         className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium relative"
//                         style={{ width: 100, paddingRight: "16px" }}
//                       >
//                         <button
//                           type="button"
//                           className="text-white font-medium rounded"
//                           style={{
//                             width: 61,
//                             height: 40,
//                             borderRadius: 8,
//                             paddingTop: 8,
//                             paddingRight: 12,
//                             paddingBottom: 8,
//                             paddingLeft: 12,
//                             background: "var(--Neutral-Grey-100, #25292A)",
//                           }}
//                           onClick={() => openViewModal(user)}
//                         >
//                           View
//                         </button>
//                       </td>
//                     </>
//                   ) : (
//                     // default rows for other tabs
//                     <>
//                       <td
//                         className="px-4 py-1.5 whitespace-nowrap text-sm font-medium"
//                         style={{ width: "502px", paddingLeft: "16px" }}
//                       >
//                         <div className="flex items-center txt-14 font-medium">
//                           <div className="w-11 h-11 rounded-full border flex items-center justify-center mr-3 border-[color:var(--Neutral-Grey-10,#E9EDEE)]">
//                             <span
//                               className="text-gray-700 txt-18"
//                               style={{
//                                 fontFamily: "SF Pro Display, sans-serif",
//                                 fontWeight: 700,
//                                 lineHeight: "20px",
//                                 letterSpacing: "0px",
//                               }}
//                             >
//                               {getInitials(user.name)}
//                             </span>
//                           </div>

//                           <div className="flex flex-col">
//                             <span className="font-medium">{user.name}</span>
//                             <span className="txt-12 text-[#51595A]">
//                               @{user.username}
//                             </span>
//                           </div>
//                         </div>
//                       </td>
//                       <td
//                         className="px-4 py-4 whitespace-nowrap txt-14 font-medium "
//                         style={{ width: "502px" }}
//                       >
//                         {user.email}
//                       </td>
//                       <td
//                         className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium relative"
//                         style={{ width: "100px", paddingRight: "16px" }}
//                       >
//                         <button
//                           onClick={(e) => toggleMenu(user.id, e)}
//                           className="p-1 rounded "
//                         >
//                           <PiDotsThreeOutline size={20} />
//                         </button>

//                         {openMenuId === user.id && (
//                           <div
//                             ref={(el) => {
//                               menuRefs.current[user.id] = el;
//                             }}
//                             className="absolute right-4 sm:right-8 -mt-6 sm:-mt-1 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200"
//                           >
//                             <div className="py-1">
//                               <button
//                                 onClick={() =>
//                                   handleMenuAction(user, "restrict")
//                                 }
//                                 className="flex items-center w-full text-left px-4 py-2 text-sm "
//                               >
//                                 <img
//                                   src={
//                                     user.status === "active"
//                                       ? "/dashboardIcons/slash-red.svg"
//                                       : "/dashboardIcons/slash.svg"
//                                   }
//                                   alt="icon"
//                                   width={20}
//                                   height={20}
//                                   className="mr-2"
//                                 />
//                                 {user.status === "active"
//                                   ? "Restrict"
//                                   : "Unrestrict"}
//                               </button>
//                               <button
//                                 onClick={() => handleMenuAction(user, "delete")}
//                                 className="flex items-center w-full text-left px-4 py-2 text-sm "
//                               >
//                                 <img
//                                   src="/dashboardIcons/trash.svg"
//                                   alt="trash"
//                                   width={20}
//                                   height={20}
//                                   className="mr-2"
//                                 />
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>

//           {/* only show pagination when there's at least one item */}
//           {totalItems > 0 && (
//             <tfoot>
//               <tr className="sticky bottom-0 bg-white z-20">
//                 <td
//                   colSpan={activeTab === "request" ? 4 : 3}
//                   className="px-4 py-3"
//                 >
//                   <div className="flex items-center justify-end  gap-10 sm:gap-6 sm:ml-6">
//                     <div className="flex items-center">
//                       <span className="text-sm text-gray-700 mr-2">
//                         Rows per page:
//                       </span>
//                       <select
//                         value={rowsPerPage}
//                         onChange={handleRowsPerPageChange}
//                         className="form-select border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                       >
//                         <option value={5}>5</option>
//                         <option value={10}>10</option>
//                         <option value={15}>15</option>
//                       </select>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm text-gray-700">
//                         {startItem}-{endItem} of {totalItems}
//                       </span>

//                       <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         aria-label="Previous page"
//                         className={`p-1 rounded-md ${
//                           currentPage === 1
//                             ? "text-gray-400"
//                             : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M15 19l-7-7 7-7"
//                           ></path>
//                         </svg>
//                       </button>

//                       <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={
//                           currentPage === totalPages || totalPages === 0
//                         }
//                         aria-label="Next page"
//                         className={`p-1 rounded-md ${
//                           currentPage === totalPages || totalPages === 0
//                             ? "text-gray-400"
//                             : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 5l7 7-7 7"
//                           ></path>
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             </tfoot>
//           )}
//         </table>
//       </div>

//       {/* Modal Overlay for confirm restrict/delete */}
//       {modal.isOpen && (
//         <div
//           className="fixed inset-0 bg-[#00000033] flex items-center justify-center z-50"
//           onClick={(e) => {
//             // clicking overlay closes modal
//             if (e.target === e.currentTarget) {
//               setModal({ isOpen: false, type: null, user: null, action: null });
//             }
//           }}
//         >
//           <div className="bg-white rounded-lg p-7.5 w-96 sm:w-133">
//             <button
//               onClick={() =>
//                 setModal({
//                   isOpen: false,
//                   type: null,
//                   user: null,
//                   action: null,
//                 })
//               }
//               className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
//               aria-label="Close"
//             >
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M6 6l12 12M6 18L18 6"
//                   stroke="#6B7280"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>

//             <h3 className="txt-18 font-semibold mb-4">
//               {modal.type === "restrict"
//                 ? `Confirm ${modal.action}`
//                 : "Confirm Delete"}
//             </h3>
//             <p className="txt-16 font-normal mb-6">
//               {modal.type === "restrict"
//                 ? `Are you sure you want to ${modal.action} ${modal.user?.name}?`
//                 : `Are you sure you want to delete ${modal.user?.name}? This action cannot be undone.`}
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => handleModalAction(false)}
//                 className="px-4 py-2 txt-16 font-semibold text-gray-700 hover:bg-gray-100 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleModalAction(true)}
//                 className={`px-4 py-2 txt-16 font-semibold text-white rounded-lg ${
//                   modal.type === "delete" ? "bg-[#F14D4D]" : "bg-[#F14D4D]"
//                 }`}
//               >
//                 {modal.type === "restrict"
//                   ? modal.action === "restrict"
//                     ? "Restrict"
//                     : "Unrestrict"
//                   : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* NEW: View Modal for sales requests */}
//       {viewModal.isOpen && viewModal.user && (
//         <div
//           className="fixed inset-0 bg-[#00000033] flex items-center justify-center z-50"
//           onClick={(e) => {
//             // close only when clicking overlay
//             if (e.target === e.currentTarget) closeViewModal();
//           }}
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="view-user-title"
//         >
//           <div className="bg-white rounded-lg max-w-[438px] max-h-[475px] mx-6 relative ">
//             <div className="px-6 py-4 flex items-center border-b border-[#E9EDEE]">
//               {/* Close X */}
//               <button
//                 onClick={closeViewModal}
//                 className="absolute right-4  p-1 rounded-full hover:bg-gray-100"
//                 aria-label="Close"
//               >
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                   <path
//                     d="M6 6l12 12M6 18L18 6"
//                     stroke="#6B7280"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>

//               <h3
//                 id="view-user-title"
//                 className="text-[20px] font-semibold "
//               >
//                 View Request
//               </h3>
//             </div>
//             <div className="flex-1 p-6">
//               <div className="flex items-center justify-start">
//                 <div
//                   className="w-12 h-12 rounded-full border flex items-center justify-center"
//                   style={{ borderColor: "var(--Neutral-Grey-10,#E9EDEE)" }}
//                   aria-hidden
//                 >
//                   <span className="text-[#51595A] txt-18 font-bold">
//                     {getInitials(viewModal.user.name)}
//                   </span>
//                 </div>
//                 <div>
//                   <div className="font-semibold txt-16">
//                     {viewModal.user.name}
//                   </div>
//                   <div className="txt-14 text-[#51595A]">
//                     @{viewModal.user.username}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3 txt-14 ">
//                 {/* <div className="txt-14 mb-1">Phone</div> */}
//                 <div className="font-medium">{viewModal.user.phone ?? "-"}</div>
//               </div>

//               <div className="mt-4 txt-14 ">
//                 {/* <div className="txt-14 mb-1">Why do you want to do sales?</div> */}
//                 <div className="mt-1 txt-14 font-medium leading-5 break-words">
//                   {viewModal.user.salesReason ?? "-"}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <div className="txt-14 mb-2">Team</div>
//                 <select
//                   value={selectedTeam}
//                   onChange={(e) => setSelectedTeam(e.target.value)}
//                   className="w-full h-14 px-3 txt-12 bg-[#F2F5F6] text-[#626D6F] rounded-md focus:outline-none  "
//                 >
//                   <option value="">Select team</option>
//                   <option value="team-north">North</option>
//                   <option value="team-south">South</option>
//                   <option value="team-enterprise">Enterprise</option>
//                 </select>
//               </div>
//             </div>
//             <div className="p-6 flex items-center justify-end gap-3 border-t border-[#E9EDEE] bg-[#F2F5F6] rounded-b-2xl">
//               <button
//                 onClick={() => handleRejectFromView(viewModal.user!.id)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
//               >
//                 Reject
//               </button>

//               <button
//                 onClick={() =>
//                   handleAddToSalesTeam(viewModal.user!.id, selectedTeam)
//                 }
//                 className="px-4 py-2 bg-[#25292A] text-white rounded-md text-sm font-medium hover:opacity-95"
//               >
//                 Add to Sales Team
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
