import React from 'react';

export const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-xl z-50 min-w-[120px] sm:min-w-[150px]">
        <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{label} 2024</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between space-x-4 sm:space-x-6 mb-2 last:mb-0 text-xs sm:text-sm">
            <div className="flex items-center">
               <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mr-2 shadow-sm" style={{ backgroundColor: entry.color }} />
               <span className="text-gray-500 dark:text-slate-400 capitalize font-medium">{entry.name}</span>
            </div>
            <span className="text-gray-900 dark:text-white font-bold">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-2 sm:p-3 border border-gray-100 dark:border-slate-700 rounded-xl shadow-lg z-50 flex items-center space-x-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{payload[0].name}</span>
        <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">${payload[0].value.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
      </div>
    );
  }
  return null;
};