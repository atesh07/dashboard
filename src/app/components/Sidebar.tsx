"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Wallet, CalendarDays, CreditCard, 
  TrendingUp, BarChart3, PieChart, FileText, 
  MessageSquare, Settings, AlertCircle, HelpCircle
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname(); // Get the current route

  // Array of all main menu items
  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: Wallet, label: "My Wallet", href: "/wallet" },
    { icon: CalendarDays, label: "Transaction", href: "/transactions" },
    { icon: CreditCard, label: "Loans", href: "/loans" },
    { icon: TrendingUp, label: "Investment", href: "/investment" },
    { icon: BarChart3, label: "Statistic", href: "/statistics" },
    { icon: PieChart, label: "Budgeting", href: "/budgeting" },
    { icon: FileText, label: "Report", href: "/report" }, // Added a placeholder href
  ];

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
          
          {menuItems.map((item, idx) => {
            // Check if the current pathname matches the item's href
            const isActive = pathname === item.href;

            return (
              <Link 
                key={idx} 
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    // Active Styles (Blue background & text)
                    ? "bg-slate-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" 
                    // Inactive Styles (Gray text, hover effects)
                    : "text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <item.icon size={20} /> {item.label}
              </Link>
            );
          })}
          
          {/* Message Link (Static) */}
          <Link href="/messages" className="flex items-center justify-between px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} /> Message
            </div>
            <span className="bg-rose-500 text-white m-2 text-[10px] font-bold px-2 py-0.5 rounded-full">4</span>
          </Link>
        </nav>

        {/* Help & Settings */}
        <nav className="space-y-1 mt-8 mb-6">
          <p className="text-xs text-gray-400 dark:text-slate-500 font-semibold mb-4 uppercase tracking-wider">Help & Settings</p>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <Settings size={20} /> Settings
          </Link>
          <Link href="/feedback" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <AlertCircle size={20} /> Feedback
          </Link>
          <Link href="/help" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors">
            <HelpCircle size={20} /> Help & Center
          </Link>
        </nav>
      </div>
    </aside>
  );
}