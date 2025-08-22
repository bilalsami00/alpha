// app/dashboard/components/Users.tsx
"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "restricted" | "request";
}

export default function Users() {
  const [activeTab, setActiveTab] = useState<"active" | "restricted" | "request">("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data for demonstration
  const allUsers: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "active" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", status: "active" },
    { id: 4, name: "Sarah Wilson", email: "sarah.w@example.com", status: "active" },
    { id: 5, name: "Michael Brown", email: "michael.b@example.com", status: "active" },
    { id: 6, name: "Emily Davis", email: "emily.d@example.com", status: "active" },
    { id: 7, name: "David Miller", email: "david.m@example.com", status: "active" },
    { id: 8, name: "Jessica Taylor", email: "jessica.t@example.com", status: "active" },
    { id: 9, name: "Daniel Anderson", email: "daniel.a@example.com", status: "active" },
    { id: 10, name: "Jennifer Thomas", email: "jennifer.t@example.com", status: "active" },
    { id: 11, name: "Christopher Martinez", email: "chris.m@example.com", status: "restricted" },
    { id: 12, name: "Amanda Clark", email: "amanda.c@example.com", status: "restricted" },
    { id: 13, name: "Matthew Rodriguez", email: "matt.r@example.com", status: "restricted" },
    { id: 14, name: "Elizabeth Lewis", email: "elizabeth.l@example.com", status: "request" },
    { id: 15, name: "James Lee", email: "james.l@example.com", status: "request" },
    { id: 16, name: "Olivia Walker", email: "olivia.w@example.com", status: "request" },
    { id: 17, name: "Andrew Hall", email: "andrew.h@example.com", status: "request" },
    { id: 18, name: "Sophia Allen", email: "sophia.a@example.com", status: "request" },
    { id: 19, name: "Joshua Young", email: "joshua.y@example.com", status: "request" },
    { id: 20, name: "Isabella Hernandez", email: "isabella.h@example.com", status: "request" },
  ];

  // Filter users based on active tab and search query
  const filteredUsers = allUsers.filter(user => 
    user.status === activeTab && 
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  const startItem = startIndex + 1;
  const endItem = Math.min(startIndex + rowsPerPage, filteredUsers.length);
  const totalItems = filteredUsers.length;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-neutral-800 mb-6 sm:ml-6 sm:mt-12"  >
        Users
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 sm:ml-6">
        <button
          onClick={() => { setActiveTab("active"); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "active"
              ? "bg-brand text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Active Users
        </button>
        <button
          onClick={() => { setActiveTab("restricted"); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "restricted"
              ? "bg-brand text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Restricted Users
        </button>
        <button
          onClick={() => { setActiveTab("request"); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "request"
              ? "bg-brand text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sales Tab Request
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6 sm:ml-6" 
       >
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            // style={{ width: '1136px' }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden sm:ml-6"  >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{  paddingLeft: '16px' }}
              >
                Name
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                // style={{ width: '502px' }}
              >
                Email
              </th>
              <th 
                scope="col" 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{  paddingRight: '16px' }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td 
                  className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  style={{ width: '502px', paddingLeft: '16px' }}
                >
                  {user.name}
                </td>
                <td 
                  className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                  style={{ width: '502px' }}
                >
                  {user.email}
                </td>
                <td 
                  className="px-4 py-4 whitespace-nowrap text-sm font-medium"
                  style={{ width: '100px', paddingRight: '16px' }}
                >
                  <button className="text-blue-600 hover:text-blue-900">
                    {activeTab === "active" ? "Restrict" : activeTab === "restricted" ? "Activate" : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-6 gap-10 sm:gap-6 sm:ml-6" >
        <div className="flex items-center">
          <span className="text-sm text-gray-700 sm:mr-2">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="form-select border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            {startItem}-{endItem} of {totalItems}
          </span>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1 rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-1 rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}