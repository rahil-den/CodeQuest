// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAlluser } from '../../service/api';
const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setIsUser] = useState([]); // State to hold fetched users
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAlluser()
        setIsUser(data.users) // Setting the fetched users
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])
  const setTime = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString(); // Formats date and time according to user's locale
  };
  

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-20 bg-primary-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 fixed md:static top-16 left-0 z-10 w-64 bg-white shadow-sm border-r border-gray-100 h-[calc(100vh-4rem)] overflow-y-auto`}
      >
        <div className="p-4">
          <div className="bg-primary-50 rounded-lg p-3 mb-4">
            <h2 className="font-medium text-primary-800 flex items-center gap-2">
              <span className="material-symbols-outlined">dashboard</span>
              Welcome, Admin
            </h2>
            <p className="text-xs text-primary-600 mt-1">Last login: {setTime()} </p>
          </div>
        </div>
        <nav className="px-2">
          <a
            href="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-primary-50 text-primary-700 mb-1"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </a>
            <Link to="/admin/dashboard/allusers" className="flex items-center gap-3">
          <button className="flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors mb-1">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-500">group</span>
              <span>Users</span>
            </div>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
            {isUser.length}
            </span>
          </button>
            </Link>
         
          <details className="group">
            <summary className="flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors mb-1 cursor-pointer list-none">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-500">code</span>
                <span>Manage Problems</span>
              </div>
              <svg
                className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9L12 16L5 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className="ml-10 mt-1 mb-2 flex flex-col gap-1">
              <a
                href="/admin/dashboard/allproblems"
                className="px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-gray-500">
                  format_list_bulleted
                </span>
                All Problems
              </a>
              
              <a
                href="/admin/dashboard/addproblem"
                className="px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-gray-500">add_circle</span>
                Add New Problem
              </a>
            </div>
          </details>
          <a
            href="/admin/dashboard/allsubmission"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors mb-1"
          >
            <span className="material-symbols-outlined text-gray-500">analytics</span>
            <span>All submission</span>
          </a>
          <a
            href=""
            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors mb-1"
          >
            <span className="material-symbols-outlined text-gray-500">settings</span>
            <span>Settings</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;