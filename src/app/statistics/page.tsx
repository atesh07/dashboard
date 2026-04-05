'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, 
  Activity, ArrowUpRight, ArrowDownRight, Calendar, X, CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

import { useData } from '@/context/DataContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-2xl shadow-xl text-sm animate-in zoom-in-95 transition-all">
        <p className="font-bold text-gray-900 dark:text-white mb-3 text-base">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-500 dark:text-slate-400 capitalize font-medium">{entry.name}</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              ${entry.value.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Statistics() {
  const { transactions, cashflowData, pieColors, savingsGoals } = useData();
  const [isMounted, setIsMounted] = useState(false);
  const [timeframe, setTimeframe] = useState('ALL'); 
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Dynamic Filtering Logic for Transactions (Metrics & Pie Chart) ---
  const filteredTransactions = useMemo(() => {
    // Find the most recent date in the mock data to base our filters on
    const latestDate = transactions.length > 0 
      ? new Date(Math.max(...transactions.map(t => new Date(t.date).getTime())))
      : new Date();

    return transactions.filter(tx => {
      let matchesDate = true;
      const txDate = new Date(tx.date);

      if (startDate) {
        matchesDate = matchesDate && txDate >= new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && txDate <= end;
      }

      if (!startDate && !endDate && timeframe !== 'ALL') {
         const cutoff = new Date(latestDate);
         const monthsToSubtract = timeframe === '1M' ? 1 : timeframe === '6M' ? 6 : 12;
         cutoff.setMonth(cutoff.getMonth() - monthsToSubtract);
         matchesDate = txDate >= cutoff;
      }

      return matchesDate;
    });
  }, [transactions, startDate, endDate, timeframe]);

  // --- Dynamic Filtering Logic for Graphs (Area & Bar Chart) ---
  const filteredCashflow = useMemo(() => {
    if (timeframe === '1M') return cashflowData.slice(-2); // Show 2 months to draw a line
    if (timeframe === '6M') return cashflowData.slice(-6);
    if (timeframe === '1Y') return cashflowData.slice(-12);
    return cashflowData;
  }, [cashflowData, timeframe]);


  const totals = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, tx) => {
        if (tx.type === 'Credit' || tx.type === 'income') acc.income += Math.abs(tx.amount);
        if (tx.type === 'Debit' || tx.type === 'expense') acc.expense += Math.abs(tx.amount);
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [filteredTransactions]);

  const netSavings = totals.income - totals.expense;
  const savingsRate = totals.income > 0 ? ((netSavings / totals.income) * 100).toFixed(1) : 0;

  const categoryData = useMemo(() => {
    const expenses = filteredTransactions.filter(tx => tx.type === 'Debit' || tx.type === 'expense');
    const grouped = expenses.reduce((acc, tx) => {
      const cat = tx.description || tx.category || 'Other';
      acc[cat] = (acc[cat] || 0) + Math.abs(tx.amount);
      return acc;
    }, {} as Record<string, number>);

    const sortedCategories = Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const top4 = sortedCategories.slice(0, 4);
    const othersValue = sortedCategories.slice(4).reduce((sum, item) => sum + item.value, 0);
    
    if (othersValue > 0) top4.push({ name: 'Other', value: othersValue });

    return top4.map((item, index) => ({
      ...item,
      color: pieColors[index % pieColors.length]
    }));
  }, [filteredTransactions, pieColors]);

  const handleQuickFilter = (tf: string) => {
    setTimeframe(tf);
    setStartDate(''); 
    setEndDate('');
  };

  const formatDateDisplay = () => {
    if (startDate && endDate) return `${new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    if (startDate) return `From ${new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    if (endDate) return `Until ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    return 'Custom Range';
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 font-sans text-gray-900 dark:text-slate-300 transition-colors duration-300 overflow-x-hidden relative">
      
      {isDateMenuOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setIsDateMenuOpen(false)}></div>
      )}

      <div className="max-w-7xl mx-auto space-y-6 relative z-0">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Financial Statistics
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Track your cashflow and spending habits.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Quick Filters */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-1 flex text-sm shadow-sm transition-colors w-full sm:w-auto justify-center">
              {['1M', '6M', '1Y', 'ALL'].map((tf) => (
                <button 
                  key={tf}
                  onClick={() => handleQuickFilter(tf)}
                  className={`px-4 py-1.5 rounded-lg font-medium transition-all duration-300 ${
                    timeframe === tf && !startDate && !endDate
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Custom Date Filter */}
            <div className="relative z-20 w-full sm:w-auto">
              <button 
                onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                className={`w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 border rounded-xl transition-colors shadow-sm font-medium text-sm ${
                  startDate || endDate 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300'
                }`}
              >
                <Calendar size={16} className={startDate || endDate ? 'text-blue-500' : 'text-gray-400'} /> 
                {formatDateDisplay()}
              </button>

              {isDateMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-4">
                     <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Filter by Date</p>
                     {(startDate || endDate) && (
                       <button onClick={() => { setStartDate(''); setEndDate(''); }} className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center">
                         <X size={14} className="mr-1"/> Clear
                       </button>
                     )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">From</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:[color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">To</label>
                      <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:[color-scheme:dark]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Top Metrics Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Income" amount={`$${totals.income.toLocaleString()}`} trend="+12.5%" isPositive={true} icon={<TrendingUp size={20} className="text-emerald-500" />} delay="delay-0" isMounted={isMounted} />
          <MetricCard title="Total Expenses" amount={`$${totals.expense.toLocaleString()}`} trend="-4.2%" isPositive={false} icon={<TrendingDown size={20} className="text-rose-500" />} delay="delay-75" isMounted={isMounted} />
          <MetricCard title="Net Savings" amount={`$${netSavings.toLocaleString()}`} trend="+8.1%" isPositive={true} icon={<DollarSign size={20} className="text-blue-500" />} delay="delay-150" isMounted={isMounted} />
          <MetricCard title="Savings Rate" amount={`${savingsRate}%`} trend="+2.4%" isPositive={true} icon={<Activity size={20} className="text-indigo-500" />} delay="delay-200" isMounted={isMounted} />
        </div>

        {/* --- Middle Charts Row --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className={`lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-500 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Cashflow Trend</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400">Income vs Expenses over time</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div>Income</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div>Expense</div>
              </div>
            </div>
            
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredCashflow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-slate-800 opacity-50" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} animationDuration={500} />
                  <Area type="monotone" dataKey="expense" name="Expense" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" activeDot={{ r: 6, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }} animationDuration={500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-slate-800 flex flex-col transition-all duration-500 delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Expenses</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400">By category</p>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-xl"><PieChartIcon size={18} className="text-gray-400"/></div>
            </div>

            <div className="flex-1 w-full relative min-h-[220px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${totals.expense.toLocaleString()}</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">Total Spent</span>
              </div>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none" animationDuration={500}>
                      {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">No expenses in this range</div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {categoryData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm group">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-3 h-3 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-125" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600 dark:text-slate-300 font-medium truncate">{item.name}</span>
                  </div>
                  <div className="text-right shrink-0 ml-4"><span className="font-bold text-gray-900 dark:text-white">${item.value.toLocaleString()}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Row: Goals & Analysis --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-500 delay-500 flex flex-col ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Savings Goals</h2>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {savingsGoals.map(goal => {
                const progress = Math.min(100, (goal.current / goal.target) * 100);
                return (
                  <div key={goal.id}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                          {goal.name} {progress === 100 && <CheckCircle2 size={14} className="text-emerald-500" />}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{goal.timeLeft}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1">{progress.toFixed(0)}% Achieved</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-[2000ms] ease-out relative ${goal.color}`} style={{ width: isMounted ? `${progress}%` : '0%' }}>
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-slate-800 transition-all duration-500 delay-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Periodic Analysis</h2>
             <div className="w-full h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                 {/* Bind the Bar chart to the filteredCashflow as well */}
                 <BarChart data={filteredCashflow.length > 4 ? filteredCashflow.slice(-4) : filteredCashflow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={20}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-slate-800 opacity-50" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                   <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', className: 'text-gray-100 dark:text-slate-800 opacity-50' }} />
                   <Bar dataKey="income" name="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={500} />
                   <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} animationDuration={500} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, amount, trend, isPositive, icon, delay, isMounted }: any) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm dark:shadow-lg border border-gray-100 dark:border-slate-800 relative overflow-hidden transition-all duration-500 ${delay} ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl shadow-sm">
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
          isPositive 
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
            : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
        }`}>
          {isPositive ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
          {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate" title={amount}>{amount}</h3>
      </div>
      <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 dark:opacity-10 pointer-events-none ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
    </div>
  );
}