"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Wallet, CalendarDays, CreditCard, 
  TrendingUp, BarChart3, PieChart, FileText, 
  MessageSquare, Settings, AlertCircle, HelpCircle,
  Menu, X // <-- Imported Hamburger and Close icons
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false); // <-- State for mobile menu

  // Helper to close menu on mobile after clicking a link
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: Wallet, label: "My Wallet", href: "/wallet" },
    { icon: CalendarDays, label: "Transaction", href: "/transactions" },
    { icon: CreditCard, label: "Loans", href: "/loans" },
    { icon: BarChart3, label: "Statistic", href: "/statistics" },
   
  ];

  return (
    <>
      {/* Floating Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform active:scale-95"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col justify-between h-full overflow-y-auto transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-6 relative">
          
          {/* Close button for mobile */}
          <button 
            onClick={closeMenu}
            className="md:hidden absolute top-6 right-4 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 text-xl font-bold text-slate-900 dark:text-white">
            <div className="w-8 h-8 bg-black dark:bg-blue-600 shadow rounded-lg flex items-center justify-center text-white transition-colors">
              <span className="text-lg leading-none">Z</span>
            </div>
            Zorvyn
          </div>

          {/* Main Menu */}
          <nav className="space-y-1">
            <p className="text-xs text-gray-400 dark:text-slate-500 font-semibold mb-4 mt-6 uppercase tracking-wider">Menu</p>
            
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;

              return (
                <Link 
                  key={idx} 
                  href={item.href} 
                  onClick={closeMenu} // Close menu on click
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-slate-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" 
                      : "text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon size={20} /> {item.label}
                </Link>
              );
            })}
            
            <Link 
              href="/messages" 
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={20} /> Message
              </div>
            </Link>
          </nav>

          {/* Help & Settings */}
          <nav className="space-y-1 mt-8 mb-6">
            <p className="text-xs text-gray-400 dark:text-slate-500 font-semibold mb-4 uppercase tracking-wider">Help & Settings</p>
            <Link href="/settings" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
              <Settings size={20} /> Settings
            </Link>
            <Link href="/feedback" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
              <AlertCircle size={20} /> Feedback
            </Link>
            <Link href="/help" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
              <HelpCircle size={20} /> Help & Center
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}