import React from 'react';
import { BarChart3 } from 'lucide-react';

interface MetricCardProps {
  title: string;
  amount: string;
  trend: string;
  trendColor: string;
}

export const MetricCard = ({ title, amount, trend, trendColor }: MetricCardProps) => (
  <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 hover:shadow-md transition-shadow group w-full">
     <div className="flex justify-between items-center mb-3">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{title}</h3>
      <div className="p-1.5 sm:p-2 bg-gray-50 dark:bg-slate-900 rounded-lg text-gray-400"><BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4"/></div>
    </div>
    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-3 tracking-tight truncate">{amount}</h2>
    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 flex items-center font-medium">
      <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md mr-1.5 sm:mr-2 ${trendColor}`}>{trend}</span> Compared to last month
    </p>
  </div>
);