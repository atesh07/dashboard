'use client';

import React, { useState } from 'react';
import { Search, Bell, ChevronDown, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Adjust path if needed

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) onSearch(searchQuery);
  };

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 w-full transition-colors duration-300">
      <div className='mr-3'>
        <h1 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Overview</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          
          {/* Expandable Search */}
          <div className="relative flex items-center h-10">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center relative animate-in fade-in slide-in-from-right-4 duration-300">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-48 md:w-64 pl-9 pr-8 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white shadow-sm"
                />
                <button type="button" onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }} className="absolute right-2.5 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button type="button" onClick={() => setIsSearchOpen(true)} className="p-2.5 text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors h-full flex items-center justify-center">
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          <button className="p-2.5 text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors relative h-10 flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </button>

          <button onClick={toggleTheme} className="p-2.5 text-gray-600 dark:text-gray-400 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-colors h-10 w-10 flex items-center justify-center">
            {/* Prevents icon flash on reload */}
            {!mounted ? null : isDark ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-yellow-500" />}
          </button>
        </div>

        <div className="flex items-center pl-2 mr-3 cursor-pointer group">
          <img src="https://pbs.twimg.com/profile_images/1335140657736847362/_QfZWzUv_400x400.jpg" alt="Atesh" className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-transparent group-hover:border-blue-500 transition-all" />
          <div className="flex flex-col mr-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Atesh</span>
            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;