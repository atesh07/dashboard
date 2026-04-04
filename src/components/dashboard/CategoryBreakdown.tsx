import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomPieTooltip } from '../ui/ChartTooltips';

export const CategoryBreakdown = ({ expensesByCategory }: { expensesByCategory: any[] }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col min-h-[280px]">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-base font-bold">Category Breakdown</h3>
        <PieChartIcon className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 sm:mb-6">Expenses tracked</p>

      <div className="flex-1 w-full relative flex items-center justify-center min-h-[160px]">
        {expensesByCategory.length > 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[80%]">${expensesByCategory.reduce((sum, item) => sum + item.value, 0).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400">Total</span>
          </div>
        ) : (<span className="text-sm text-gray-400">No Data</span>)}
        <ResponsiveContainer width="100%" height="100%" className="z-10">
          <PieChart>
            <Pie data={expensesByCategory} cx="50%" cy="50%" innerRadius="65%" outerRadius="85%" paddingAngle={5} cornerRadius={8} dataKey="value" stroke="none">
              {expensesByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />)}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {expensesByCategory.slice(0, 4).map((category, idx) => (
          <div key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-300 font-medium">
            <div className="w-2.5 h-2.5 rounded-full mr-2 shrink-0" style={{ backgroundColor: category.fill }}></div><span className="truncate">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};