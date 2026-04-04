import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 w-full transition-colors duration-300">
      {/* Left Side: Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Overview
        </h1>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center space-x-6">
        
        {/* Action Icons */}
        <div className="flex items-center space-x-3">
          <button 
            type="button" 
            className="p-2.5 text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            type="button" 
            className="p-2.5 text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Dropdown Trigger */}
        <div className="flex items-center pl-2 cursor-pointer group">
          <img
            src="https://ui-avatars.com/api/?name=Jerry+Warren&background=0D8ABC&color=fff" 
            alt="Jerry Warren"
            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-transparent group-hover:border-blue-500 transition-all"
          />
          
          <div className="flex flex-col mr-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Jerry Warren
            </span>
            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
              Admin
            </span>
          </div>
          
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />
        </div>

      </div>
    </header>
  );
};

export default Header;