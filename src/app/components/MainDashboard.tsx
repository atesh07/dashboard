'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronDown, ArrowUpRight, ArrowDownLeft, 
  Plus, Copy, Calendar, Download, MoreHorizontal, 
  Sparkles, BarChart3, Search, X, ArrowUpDown, PieChart as PieChartIcon, 
  UserCircle2, ShieldCheck, Car, Home, PlusCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- Static Mock Data ---
const cashflowData = [
  { name: 'Dec', income: 4200, expense: 2400 },
  { name: 'Jan', income: 3800, expense: 1800 },
  { name: 'Feb', income: 5200, expense: 3200 },
  { name: 'Mar', income: 4500, expense: 2900 },
  { name: 'Apr', income: 6100, expense: 4100 },
  { name: 'May', income: 5800, expense: 3800 },
  { name: 'Jun', income: 7200, expense: 4300 },
];

const initialTransactions = [
  { id: 16, name: 'PayPal', category: 'Freelance', date: '16 Jul 2024', amount: 848.84, type: 'income', icon: 'P', color: 'bg-blue-100 text-blue-600' },
  { id: 15, name: 'Wise', category: 'Transfer', date: '15 Jul 2024', amount: -665.56, type: 'expense', icon: 'W', color: 'bg-teal-100 text-teal-600' },
  { id: 14, name: 'Atlassian', category: 'Software', date: '14 Jul 2024', amount: -46.84, type: 'expense', icon: 'A', color: 'bg-indigo-100 text-indigo-600' },
  { id: 13, name: 'Dropbox', category: 'Cloud', date: '13 Jul 2024', amount: -38.59, type: 'expense', icon: 'D', color: 'bg-blue-100 text-blue-600' },
  { id: 12, name: 'Upwork', category: 'Freelance', date: '12 Jul 2024', amount: 1250.00, type: 'income', icon: 'U', color: 'bg-green-100 text-green-600' },
];

const savingsGoalsData = [
  { id: 1, name: 'Emergency Fund', target: 20000, current: 14400, color: 'bg-blue-500', icon: ShieldCheck, timeLeft: '3 months left' },
  { id: 2, name: 'New Car', target: 15000, current: 12600, color: 'bg-yellow-500', icon: Car, timeLeft: '1 month left' },
  { id: 3, name: 'Dream House', target: 75000, current: 32000, color: 'bg-purple-500', icon: Home, timeLeft: '2 years left' }
];

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'];

// --- Custom Tooltips ---
const CustomAreaTooltip = ({ active, payload, label }: any) => {
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

const CustomPieTooltip = ({ active, payload }: any) => {
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

const MainSection = () => {
  const [role, setRole] = useState<'admin' | 'viewer'>('admin');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ name: '', amount: '', type: 'expense', category: '' });
  const [visibleLines, setVisibleLines] = useState({ income: true, expense: true });
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fin_dashboard_txs_v4');
    if (saved) {
      try { setTransactions(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    // Trigger progress bar animations shortly after mount
    const timer = setTimeout(() => setAnimateProgress(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('fin_dashboard_txs_v4', JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(tx => {
      const matchesFilter = filterType === 'all' || tx.type === filterType;
      const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    result.sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);
    return result;
  }, [transactions, filterType, searchQuery, sortOrder]);

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return { message: "Great job! You have no expenses recorded." };
    const topCategory = expenses.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))[0];
    return { message: `Highest expense recently was ${topCategory?.category} (${topCategory?.name}) at $${Math.abs(topCategory?.amount || 0).toFixed(2)}.` };
  }, [transactions]);

  const dynamicBalance = useMemo(() => {
    const baseBalance = 24847.84;
    const addedIncome = transactions.filter(t => t.id > 20 && t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const addedExpense = transactions.filter(t => t.id > 20 && t.type === 'expense').reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    return baseBalance + addedIncome - addedExpense;
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(grouped)
      .map((key, index) => ({ name: key, value: grouped[key], fill: PIE_COLORS[index % PIE_COLORS.length] }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.name || !newTx.amount || !newTx.category) return;
    const amountNum = parseFloat(newTx.amount);
    const finalAmount = newTx.type === 'expense' ? -Math.abs(amountNum) : Math.abs(amountNum);
    
    const transaction = {
      id: Date.now(), 
      name: newTx.name, 
      category: newTx.category,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: finalAmount, 
      type: newTx.type, 
      icon: newTx.name.charAt(0).toUpperCase(),
      color: newTx.type === 'income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    };
    
    setTransactions([transaction, ...transactions]);
    setIsModalOpen(false);
    setNewTx({ name: '', amount: '', type: 'expense', category: '' });
  };

  const toggleLine = (line: 'income' | 'expense') => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-300 relative min-h-screen">
      
      {/* Top Bar Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8 gap-4 w-full">
        <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center justify-between md:justify-start gap-4">
          <h2 className="text-xl font-medium text-gray-500 dark:text-slate-400">
            Welcome back, <span className="font-bold text-gray-900 dark:text-white">Jerry 🔥</span>
          </h2>
          <div className="flex items-center space-x-2 bg-gray-200/50 dark:bg-slate-800 p-1 rounded-lg w-fit">
            <button onClick={() => setRole('admin')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Admin</button>
            <button onClick={() => setRole('viewer')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${role === 'viewer' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Viewer</button>
          </div>
        </div>

        <div className="flex w-full md:w-auto space-x-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button className="flex-1 md:flex-none flex items-center justify-center whitespace-nowrap px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:shadow-md transition-all">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" /> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center whitespace-nowrap px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* ========================================== */}
        {/* LEFT COLUMN */}
        {/* ========================================== */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 hover:shadow-md transition-shadow w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">My Balance</h3>
              <span className="text-xs bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition">Current <ChevronDown className="inline w-3 h-3"/></span>
            </div>
            <div className="flex items-baseline space-x-3 mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight truncate">${dynamicBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h1>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center shadow-sm transition-all">
                <ArrowUpRight className="w-4 h-4 mr-2" /> Transfer
              </button>
              <button className="flex-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                <ArrowDownLeft className="w-4 h-4 mr-2" /> Receive
              </button>
            </div>
          </div>

          {/* Quick Transfer */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 w-full">
             <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quick Transfer</h3>
            </div>
            <div className="flex items-center space-x-3 overflow-x-auto pb-1 hide-scrollbar">
               <button className="w-10 h-10 rounded-full border border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 flex-shrink-0 transition-colors">
                  <Plus className="w-5 h-5" />
               </button>
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="relative flex-shrink-0 cursor-pointer hover:ring-2 ring-blue-500 rounded-full transition-all">
                   <UserCircle2 className="w-10 h-10 text-gray-300 dark:text-slate-600" />
                 </div>
               ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-800/30 flex space-x-4 items-start transition-all w-full">
              <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-full text-indigo-600 dark:text-indigo-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-1">Smart Insight</h3>
                <p className="text-xs text-indigo-700 dark:text-indigo-300/80 leading-relaxed">{insights.message}</p>
              </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col flex-1 min-h-[350px] w-full">
             <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold">Recent Activity</h3>
              {role === 'admin' && (
                <button onClick={() => setIsModalOpen(true)} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center font-medium">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-lg flex-1 overflow-x-auto hide-scrollbar">
                  {(['all', 'income', 'expense'] as const).map(f => (
                    <button key={f} onClick={() => setFilterType(f)} className={`flex-1 min-w-[60px] py-1.5 text-[10px] sm:text-xs font-medium rounded-md capitalize transition-all ${filterType === f ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                      {f}
                    </button>
                  ))}
                </div>
                <button onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')} className="bg-gray-100 dark:bg-slate-900 p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0">
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 overflow-y-auto pr-1 sm:pr-2 flex-1 custom-scrollbar">
              {filteredTransactions.length === 0 ? (
                <div className="h-full flex items-center justify-center"><p className="text-center text-sm text-gray-500">No transactions found.</p></div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between group p-2 hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-2xl transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${tx.color}`}>{tx.icon}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate max-w-[120px] sm:max-w-[140px]">{tx.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{tx.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                        <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                          {tx.type === 'income' ? '+' : ''}{tx.amount}
                        </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN */}
        {/* ========================================== */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 w-full">
          
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            <MetricCard title="Monthly Spent" amount="$45,623.48" trend="↑ 16.5%" trendColor="text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400" />
            <MetricCard title="Monthly Income" amount="$84,884.80" trend="↑ 12.8%" trendColor="text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400" />
          </div>

          {/* 1. Time-Based Viz: Cashflow Double Area Chart */}
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
                <button onClick={() => toggleLine('expense')} className={`flex items-center text-[10px] sm:text-xs font-semibold transition-opacity ${!visibleLines.expense && 'opacity-40'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2 shadow-sm"></span>
                  <span className="text-gray-600 dark:text-slate-300">Expense</span>
                </button>
                <button onClick={() => toggleLine('income')} className={`flex items-center text-[10px] sm:text-xs font-semibold transition-opacity ${!visibleLines.income && 'opacity-40'}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-2 shadow-sm"></span>
                  <span className="text-gray-600 dark:text-slate-300">Income</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full mt-2 -ml-2 sm:-ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashflowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-slate-700/50" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} tickFormatter={(value) => `$${value / 1000}k`} dx={-5} />
                  <Tooltip cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} content={<CustomAreaTooltip />} />
                  
                  {visibleLines.expense && (
                    <Area type="monotone" dataKey="expense" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" activeDot={{ r: 5, strokeWidth: 0, fill: '#2563eb' }} />
                  )}
                  {visibleLines.income && (
                    <Area type="monotone" dataKey="income" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" activeDot={{ r: 5, strokeWidth: 0, fill: '#facc15' }} />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LOWER GRID: Category Breakdown & Savings Goals Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-1">
            
            {/* 2. Categorical Viz: Spending Breakdown Donut Chart */}
            <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-base font-bold">Category Breakdown</h3>
                <PieChartIcon className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 sm:mb-6">Expenses tracked</p>

              <div className="flex-1 w-full relative flex items-center justify-center min-h-[160px]">
                {expensesByCategory.length > 0 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                    <span className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[80%]">
                      ${expensesByCategory.reduce((sum, item) => sum + item.value, 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400">Total</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">No Data</span>
                )}

                <ResponsiveContainer width="100%" height="100%" className="z-10">
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%" cy="50%"
                      innerRadius="65%" outerRadius="85%"
                      paddingAngle={5} cornerRadius={8}
                      dataKey="value" stroke="none"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Dynamic Legend */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {expensesByCategory.slice(0, 4).map((category, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-300 font-medium">
                    <div className="w-2.5 h-2.5 rounded-full mr-2 shrink-0" style={{ backgroundColor: category.fill }}></div>
                    <span className="truncate">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Goals (UPGRADED) */}
            <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold">Savings Goals</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Active portfolies</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Add New Goal">
                    <PlusCircle className="w-5 h-5" />
                  </button>
                  <span className="text-xs bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-3 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition hidden sm:inline-block">Q3 Goals <ChevronDown className="inline w-3 h-3 ml-1"/></span>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {savingsGoalsData.map((goal) => {
                  const percentage = Math.round((goal.current / goal.target) * 100);
                  return (
                    <div key={goal.id} className="group p-3 sm:p-4 rounded-2xl bg-gray-50/50 dark:bg-slate-700/20 border border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-all hover:shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl text-white ${goal.color} shadow-sm`}>
                            <goal.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{goal.name}</h4>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400">Target: ${goal.target.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-gray-900 dark:text-white">${goal.current.toLocaleString()}</span>
                          <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{goal.timeLeft}</p>
                        </div>
                      </div>
                      
                      {/* Animated Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden flex items-center shadow-inner relative">
                        <div 
                          className={`${goal.color} h-full transition-all duration-[1500ms] ease-out relative`} 
                          style={{ width: animateProgress ? `${percentage}%` : '0%' }}
                        >
                          {/* Inner shimmer animation */}
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-full h-full animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-1">
                         <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400">{percentage}% Complete</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* --- ADD TRANSACTION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg sm:text-xl font-bold">Add Transaction</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name / Merchant</label>
                <input type="text" required value={newTx.name} onChange={e => setNewTx({...newTx, name: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Netflix" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <input type="text" required value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Entertainment" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
                  <input type="number" step="0.01" required value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value as 'income' | 'expense'})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-xl transition-all mt-4 sm:mt-6 shadow-sm">
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS for utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

// --- Metric Card Component ---
const MetricCard = ({ title, amount, trend, trendColor }: { title: string, amount: string, trend: string, trendColor: string }) => (
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

export default MainSection;