"use client";
import { 
  LayoutDashboard, Wallet, CalendarDays, CreditCard, 
  TrendingUp, BarChart3, PieChart, FileText, 
  MessageSquare, Settings, AlertCircle, HelpCircle, Moon, Sun
} from "lucide-react";
import { useTheme } from "../ThemeContext"; // Import the hook

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside className="w-[220px] bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col justify-between hidden md:flex h-full overflow-y-auto transition-colors duration-300">
      <div className="p-6">
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
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-semibold transition-colors">
            <LayoutDashboard size={20} /> Overview
          </a>
          {/* Reusable styles for links to save space: */}
          {[
            { icon: Wallet, label: "My Wallet" },
            { icon: CalendarDays, label: "Transaction" },
            { icon: CreditCard, label: "Loans" },
            { icon: TrendingUp, label: "Investment" },
            { icon: BarChart3, label: "Statistic" },
            { icon: PieChart, label: "Budgeting" },
            { icon: FileText, label: "Report" },
          ].map((item, idx) => (
            <a key={idx} href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
              <item.icon size={20} /> {item.label}
            </a>
          ))}
          
          <a href="#" className="flex items-center justify-between px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} /> Message
            </div>
            <span className="bg-rose-500 text-white m-2 text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
          </a>
        </nav>

        {/* Help & Settings */}
        <nav className="space-y-1 mt-8">
          <p className="text-xs text-gray-400 dark:text-slate-500 font-semibold mb-4 uppercase tracking-wider">Help & Settings</p>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <Settings size={20} /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <AlertCircle size={20} /> Feedback
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <HelpCircle size={20} /> Help & Center
          </a>
        </nav>
      </div>
      
      {/* Dark Mode Toggle */}
      <div className="p-6 border-t border-gray-100 dark:border-slate-800">
        <div 
          onClick={toggleTheme}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:ring-2 ring-blue-500/50 transition-all"
        >
          <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {isDark ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-yellow-500" />} 
            Dark Mode
          </div>
          {/* Animated Toggle Switch */}
          <div className={`w-10 h-6 rounded-full relative flex items-center px-1 transition-colors duration-300 ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>
    </aside>
  );
}