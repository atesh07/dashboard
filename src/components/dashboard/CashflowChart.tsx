import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomAreaTooltip } from '../ui/ChartTooltips';

interface CashflowChartProps {
  data: any[];
  visibleLines: { income: boolean; expense: boolean };
  onToggleLine: (line: 'income' | 'expense') => void;
}

export const CashflowChart = ({ data, visibleLines, onToggleLine }: CashflowChartProps) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col min-h-[250px] lg:min-h-[280px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-base font-bold mb-1">Cashflow Trend</h3>
          <div className="flex items-center space-x-3">
              <span className="text-xl sm:text-2xl font-extrabold">$83,074.00</span>
              <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">↑ 16.8%</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-slate-900 px-3 sm:px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700">
          <button onClick={() => onToggleLine('expense')} className={`flex items-center text-[10px] sm:text-xs font-semibold transition-opacity ${!visibleLines.expense && 'opacity-40'}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2 shadow-sm"></span><span className="text-gray-600 dark:text-slate-300">Expense</span>
          </button>
          <button onClick={() => onToggleLine('income')} className={`flex items-center text-[10px] sm:text-xs font-semibold transition-opacity ${!visibleLines.income && 'opacity-40'}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-2 shadow-sm"></span><span className="text-gray-600 dark:text-slate-300">Income</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full mt-2 -ml-2 sm:-ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/><stop offset="95%" stopColor="#facc15" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-slate-700/50" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} tickFormatter={(value) => `$${value / 1000}k`} dx={-5} />
            <Tooltip cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} content={<CustomAreaTooltip />} />
            {visibleLines.expense && <Area type="monotone" dataKey="expense" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" activeDot={{ r: 5, strokeWidth: 0, fill: '#2563eb' }} />}
            {visibleLines.income && <Area type="monotone" dataKey="income" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" activeDot={{ r: 5, strokeWidth: 0, fill: '#facc15' }} />}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};