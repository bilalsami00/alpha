// // app/dashboard/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { TbLayoutSidebar } from "react-icons/tb";
// import Image from "next/image";

// interface MenuItem {
//   name: string;
//   href?: string;
//   icon: string;
//   children?: MenuItem[];
// }

// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedTab, setSelectedTab] = useState<string | null>(null);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       setSidebarOpen(!mobile);
//     };

//     // Initial check
//     checkScreenSize();

//     // Add event listener
//     window.addEventListener("resize", checkScreenSize);

//     // Clean up
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const toggleDropdown = (name: string) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   const handleTabSelect = (tabName: string, isChild: boolean = false, parentName?: string) => {
//     if (isChild) {
//       setSelectedTab(tabName);
//       // Auto-open parent dropdown when child is selected
//       if (parentName) {
//         setActiveDropdown(parentName);
//       }
//     } else {
//       // For parent tabs, only select if they don't have children
//       const menuItem = menuItems.find(item => item.name === tabName);
//       if (menuItem && !menuItem.children) {
//         setSelectedTab(tabName);
//       }
//     }
//   };

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log("Logging out...");
//   };

//   // Helper function to check if a tab is selected
//   const isTabSelected = (tabName: string) => {
//     return selectedTab === tabName;
//   };

//   // Helper function to check if a parent has a selected child
//   const hasSelectedChild = (children: MenuItem[] | undefined) => {
//     if (!children) return false;
//     return children.some(child => isTabSelected(child.name));
//   };

//   const menuItems: MenuItem[] = [
//     { 
//       name: "User Profile", 
//       href: "#profile", 
//       icon: "/dashboardIcons/user-profile.svg" 
//     },
//     { 
//       name: "Team Management", 
//       href: "#team", 
//       icon: "/dashboardIcons/people.svg" 
//     },
//     {
//       name: "Daily Content",
//       icon: "/dashboardIcons/note-2.svg",
//       children: [
//         { name: "Quotes", href: "#quotes", icon: "" },
//         { name: "Buzzwords", href: "#buzzwords", icon: "" },
//       ],
//     },
//     {
//       name: "Media Library",
//       icon: "/dashboardIcons/video-play.svg",
//       children: [
//         { name: "Guided Breathwork", href: "#breathwork", icon: "" },
//         { name: "Guided Meditation", href: "#meditation", icon: "" },
//         { name: "Video of the Day", href: "#video", icon: "" },
//         { name: "Sales Training", href: "#sales-training", icon: "" },
//       ],
//     },
//     { 
//       name: "Hall of Fame", 
//       href: "#fame", 
//       icon: "/dashboardIcons/cup.svg" 
//     },
//     {
//       name: "Sales Manual",
//       icon: "/dashboardIcons/document-text.svg",
//       children: [
//         { name: "Reps Checklist", href: "#checklist", icon: "" },
//         { name: "Fundamental Scripts", href: "#scripts", icon: "" },
//         { name: "Sales Bible", href: "#bible", icon: "" },
//       ],
//     },
//   ];

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Mobile sidebar backdrop */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static inset-y-0 text-text-col left-0 z-30 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <div className="flex flex-col h-full justify-between py-6 px-3">
//           <div>
//             {/* Logo */}
//             <div className="flex justify-center mt-6">
//               <Image
//                 src="/authIcons/Alpha-logo.png"
//                 alt="Alpha Logo"
//                 className="h-24 w-24"
//                 width={96}
//                 height={96}
//               />
//             </div>

//             {/* Navigation */}
//             <nav className="mt-8">
//               <ul className="space-y-2">
//                 {menuItems.map((item) => {
//                   const isParentSelected = isTabSelected(item.name);
//                   const hasSelectedChildren = hasSelectedChild(item.children);
//                   const shouldHighlightParent = isParentSelected || hasSelectedChildren;
                  
//                   return (
//                     <li key={item.name}>
//                       {item.children ? (
//                         <div>
//                           <button
//                             onClick={() => toggleDropdown(item.name)}
//                             className={`w-full flex items-center px-4 py-3 txt-16 rounded-md transition-colors ${
//                               shouldHighlightParent
//                                 ? "  text-[#0E0E0E] font-medium"
//                                 : "text-text-col font-normal hover:bg-neutral-100"
//                             }`}
//                           >
//                             {/* Icon for parent item */}
//                             <div className="w-6 h-6 mr-3 flex items-center justify-center">
//                               <Image
//                                 src={item.icon}
//                                 alt={item.name}
//                                 width={24}
//                                 height={24}
//                                 className={`object-contain ${shouldHighlightParent ? "filter brightness-0" : ""}`}
//                                 style={shouldHighlightParent ? { filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" } : {}}
//                               />
//                             </div>
//                             <span className="flex-1 text-left">{item.name}</span>
//                             <Image
//                               src="/dashboardIcons/arrow-down.svg"
//                               alt="arrow down"
//                               width={20}
//                               height={20}
//                               className={`transform transition-transform ${
//                                 activeDropdown === item.name ? "rotate-180" : ""
//                               } ${shouldHighlightParent ? "filter brightness-0" : ""}`}
//                               style={shouldHighlightParent ? { filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" } : {}}
//                             />
//                           </button>

//                           {activeDropdown === item.name && (
//                             <ul className="ml-9 mt-1 space-y-1">
//                               {item.children.map((child) => {
//                                 const isChildSelected = isTabSelected(child.name);
                                
//                                 return (
//                                   <li key={child.name}>
//                                     <a
//                                       href={child.href}
//                                       onClick={() => handleTabSelect(child.name, true, item.name)}
//                                       className={`block px-4 py-2 txt-16 rounded-md transition-colors ${
//                                         isChildSelected
//                                           ? "bg-brand text-[#0E0E0E] font-medium"
//                                           : "text-text-col hover:bg-neutral-100 font-normal"
//                                       }`}
//                                     >
//                                       {child.name}
//                                     </a>
//                                   </li>
//                                 );
//                               })}
//                             </ul>
//                           )}
//                         </div>
//                       ) : (
//                         <a
//                           href={item.href}
//                           onClick={() => handleTabSelect(item.name, false)}
//                           className={`flex items-center px-4 py-3 txt-16 rounded-md transition-colors ${
//                             isParentSelected
//                               ? "bg-brand text-[#0E0E0E] font-medium"
//                               : "font-normal hover:bg-neutral-100"
//                           }`}
//                         >
//                           {/* Icon for single item */}
//                           <div className="w-6 h-6 mr-3 flex items-center justify-center">
//                             <Image
//                               src={item.icon}
//                               alt={item.name}
//                               width={24}
//                               height={24}
//                               className={`object-contain ${isParentSelected ? "filter brightness-0" : ""}`}
//                               style={isParentSelected ? { filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" } : {}}
//                             />
//                           </div>
//                           <span>{item.name}</span>
//                         </a>
//                       )}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>
//           </div>

//           {/* Logout Button */}
//           <div className="mt-6">
//             <button
//               onClick={handleLogout}
//               className="w-full h-10 py-2 px-3 flex items-center gap-2 rounded-lg hover:bg-neutral-100 transition-colors"
//               style={{ width: "232px" }}
//             >
//               <Image
//                 src="/dashboardIcons/logout.svg"
//                 alt="Logout"
//                 width={24}
//                 height={24}
//               />
//               <span className="txt-16 font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-16 lg:hidden flex items-center px-4 bg-white border-b border-neutral-200">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100 focus:outline-none"
//           >
//             <TbLayoutSidebar className="h-6 w-6" />
//           </button>
//         </header>

//         <main className="flex-1 overflow-auto p-6 bg-neutral-50">
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold text-neutral-800 mb-6">
//               Welcome to Your Dashboard
//             </h1>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <p className="text-neutral-600">
//                 This is your main content area. Select an option from the
//                 sidebar to navigate to different sections.
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }





// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { TbLayoutSidebar } from "react-icons/tb";
import Image from "next/image";
import Users from "./components/Users";
import TeamManagement from "./components/TeamManagement";
import DailyContent from "./components/DailyContent";
import MediaLibrary from "./components/MediaLibrary";
import HallOfFame from "./components/HallOfFame";
import SalesManual from "./components/SalesManual";

interface MenuItem {
  name: string;
  href?: string;
  icon: string;
  children?: MenuItem[];
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("Users"); // Set default to Users

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleTabSelect = (tabName: string, isChild: boolean = false, parentName?: string) => {
    if (isChild) {
      setSelectedTab(tabName);
      // Auto-open parent dropdown when child is selected
      if (parentName) {
        setActiveDropdown(parentName);
      }
    } else {
      // For parent tabs, only select if they don't have children
      const menuItem = menuItems.find(item => item.name === tabName);
      if (menuItem && !menuItem.children) {
        setSelectedTab(tabName);
      }
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  // Helper function to check if a tab is selected
  const isTabSelected = (tabName: string) => {
    return selectedTab === tabName;
  };

  // Helper function to check if a parent has a selected child
  const hasSelectedChild = (children: MenuItem[] | undefined) => {
    if (!children) return false;
    return children.some(child => isTabSelected(child.name));
  };

  const menuItems: MenuItem[] = [
    { 
      name: "Users", 
      href: "#users", 
      icon: "/dashboardIcons/user-profile.svg" 
    },
    { 
      name: "Team Management", 
      href: "#team", 
      icon: "/dashboardIcons/people.svg" 
    },
    {
      name: "Daily Content",
      icon: "/dashboardIcons/note-2.svg",
      children: [
        { name: "Quotes", href: "#quotes", icon: "" },
        { name: "Buzzwords", href: "#buzzwords", icon: "" },
      ],
    },
    {
      name: "Media Library",
      icon: "/dashboardIcons/video-play.svg",
      children: [
        { name: "Guided Breathwork", href: "#breathwork", icon: "" },
        { name: "Guided Meditation", href: "#meditation", icon: "" },
        { name: "Video of the Day", href: "#video", icon: "" },
        { name: "Sales Training", href: "#sales-training", icon: "" },
      ],
    },
    { 
      name: "Hall of Fame", 
      href: "#fame", 
      icon: "/dashboardIcons/cup.svg" 
    },
    {
      name: "Sales Manual",
      icon: "/dashboardIcons/document-text.svg",
      children: [
        { name: "Reps Checklist", href: "#checklist", icon: "" },
        { name: "Fundamental Scripts", href: "#scripts", icon: "" },
        { name: "Sales Bible", href: "#bible", icon: "" },
      ],
    },
  ];

  // Render content based on selected tab
  const renderContent = () => {
    switch(selectedTab) {
      case "Users":
        return <Users />;
      case "Team Management":
        return <TeamManagement />;
      case "Quotes":
      case "Buzzwords":
        return <DailyContent selectedSubTab={selectedTab} />;
      case "Guided Breathwork":
      case "Guided Meditation":
      case "Video of the Day":
      case "Sales Training":
        return <MediaLibrary selectedSubTab={selectedTab} />;
      case "Hall of Fame":
        return <HallOfFame />;
      case "Reps Checklist":
      case "Fundamental Scripts":
      case "Sales Bible":
        return <SalesManual selectedSubTab={selectedTab} />;
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-6">
              Welcome to Your Dashboard
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-neutral-600">
                This is your main content area. Select an option from the
                sidebar to navigate to different sections.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 text-text-col left-0 z-30 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full justify-between py-6 px-3">
          <div>
            {/* Logo */}
            <div className="flex justify-center mt-6">
              <Image
                src="/authIcons/Alpha-logo.png"
                alt="Alpha Logo"
                className="h-24 w-24"
                width={96}
                height={96}
              />
            </div>

            {/* Navigation */}
            <nav className="mt-8">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const isParentSelected = isTabSelected(item.name);
                  const hasSelectedChildren = hasSelectedChild(item.children);
                  const shouldHighlightParent = isParentSelected || hasSelectedChildren;
                  
                  return (
                    <li key={item.name}>
                      {item.children ? (
                        <div>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className={`w-full flex items-center px-4 py-3 txt-16 rounded-md transition-colors ${
                              shouldHighlightParent
                                ? "  text-[#0E0E0E] font-medium"
                                : "text-text-col font-normal hover:bg-neutral-100"
                            }`}
                          >
                            {/* Icon for parent item */}
                            <div className="w-6 h-6 mr-3 flex items-center justify-center">
                              <Image
                                src={item.icon}
                                alt={item.name}
                                width={24}
                                height={24}
                                className={`object-contain ${shouldHighlightParent ? "filter brightness-0" : ""}`}
                                style={shouldHighlightParent ? { filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" } : {}}
                              />
                            </div>
                            <span className="flex-1 text-left">{item.name}</span>
                            <Image
                              src="/dashboardIcons/arrow-down.svg"
                              alt="arrow down"
                              width={20}
                              height={20}
                              className={`transform transition-transform ${
                                activeDropdown === item.name ? "rotate-180" : ""
                              } ${shouldHighlightParent ? "filter brightness-0" : ""}`}
                              style={shouldHighlightParent ? { filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" } : {}}
                            />
                          </button>

                          {activeDropdown === item.name && (
                            <ul className="ml-9 mt-1 space-y-1">
                              {item.children.map((child) => {
                                const isChildSelected = isTabSelected(child.name);
                                
                                return (
                                  <li key={child.name}>
                                    <a
                                      href={child.href}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleTabSelect(child.name, true, item.name);
                                      }}
                                      className={`block px-4 py-2 txt-16 rounded-md transition-colors ${
                                        isChildSelected
                                          ? "bg-brand text-[#0E0E0E] font-medium"
                                          : "text-text-col hover:bg-neutral-100 font-normal"
                                      }`}
                                    >
                                      {child.name}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTabSelect(item.name, false);
                          }}
                          className={`flex items-center px-4 py-3 txt-16 rounded-md transition-colors ${
                            isParentSelected
                              ? "bg-brand text-[#0E0E0E] font-medium"
                              : "font-normal hover:bg-neutral-100"
                          }`}
                        >
                          {/* Icon for single item */}
                          <div className="w-6 h-6 mr-3 flex items-center justify-center">
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={24}
                              height={24}
                              className={`object-contain ${isParentSelected ? "filter brightness-0" : ""}`}
                              style={isParentSelected ? { filter: "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)" } : {}}
                            />
                          </div>
                          <span>{item.name}</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full h-10 py-2 px-3 flex items-center gap-2 rounded-lg hover:bg-neutral-100 transition-colors"
              style={{ width: "232px" }}
            >
              <Image
                src="/dashboardIcons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
              />
              <span className="txt-16 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 lg:hidden flex items-center px-4 bg-white border-b border-neutral-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100 focus:outline-none"
          >
            <TbLayoutSidebar className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-neutral-50">
          <div className="  mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}