import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const { user,logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };
  

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <svg
          className="w-8 h-8 text-primary-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
            fill="currentColor"
          />
        </svg>
        <span className="ml-2 text-xl font-bold text-gray-800">AdminHub</span>
        <span className="mx-3 text-gray-300 hidden sm:inline">|</span>
        <span className="text-gray-700 font-medium hidden sm:inline">Admin Page</span>
      </div>
      <div className="relative">
        <details className="inline-block">
          <summary className="list-none cursor-pointer">
            <div className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                {getInitials(user?.username) || 'AM'}
              </div>
              <svg className="w-5 h-5 text-gray-500 hidden sm:inline" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </summary>
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-100">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-lg">
               A
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{user?.username || 'admin'}</h4>
                <p className="text-sm text-gray-500">{user?.email || 'admin@gmail.com'}</p>
              </div>
            </div>
            <div className="mt-3">
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">account_circle</span>
                <span>Profile Settings</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">settings</span>
                <span>Preferences</span>
              </button>
              <div className="my-2 border-t border-gray-100"></div>
              <button
                className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                onClick={() => logout()}
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
};

export default AdminHeader;