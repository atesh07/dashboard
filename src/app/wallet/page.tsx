'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MoreVertical, ArrowUpRight, ArrowDownLeft, 
  ChevronRight, ChevronDown, FileText, Upload, 
  Info, CreditCard, Eye, EyeOff
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

import { cashflowData, initialTransactions } from '../Data/mockData';

const pieData = [
  { name: 'Income', value: 30, color: '#10b981' },
  { name: 'Expense', value: 46, color: '#ef4444' },
  { name: 'Unknown', value: 10, color: '#8b5cf6' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-3 rounded-xl shadow-xl text-sm transition-colors duration-300 animate-in zoom-in-95">
        <p className="font-bold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-500 dark:text-slate-400 capitalize">{entry.name}</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">${entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function WalletDashboard() {
  const [expandedRow, setExpandedRow] = useState<number | null>(15);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('Today');
  const [invoiceLimit, setInvoiceLimit] = useState(4); // Controls how many invoices show
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- FILTER LOGIC: Payment History ---
  // Simulating date filtering by slicing the array differently based on the tab
  const filteredHistory = useMemo(() => {
    if (activeTab === 'Today') return initialTransactions.slice(0, 2);
    if (activeTab === 'Weekly') return initialTransactions.slice(0, 4);
    return initialTransactions; // 'Monthly' shows all
  }, [activeTab]);

  // --- FILTER LOGIC: Invoices ---
  // Duplicating the mock data slightly so "View More" has enough items to actually expand
  const allInvoices = useMemo(() => {
    return [...initialTransactions, ...initialTransactions.map(tx => ({...tx, id: tx.id + 100}))];
  }, []);
  
  const displayedInvoices = allInvoices.slice(0, invoiceLimit);

  const toggleInvoiceView = () => {
    // If showing 4, expand to 8. If showing 8, collapse to 4.
    setInvoiceLimit(prev => prev === 4 ? 8 : 4);
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8 font-sans text-gray-900 dark:text-slate-300 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN */}
        {/* ======================================================== */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Main Balance Section */}
          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-transparent relative overflow-hidden transition-all duration-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-2">Main Balance</p>
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white transition-all duration-300">
                    {showBalance ? '$673,412.66' : '****'}
                  </h1>
                  <button 
                    onClick={() => setShowBalance(!showBalance)} 
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><MoreVertical size={20} /></button>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-16 mt-8 mb-6 text-sm">
              <div>
                <p className="text-gray-400 dark:text-slate-500 mb-1 text-xs uppercase tracking-wider">Valid Thru</p>
                <p className="font-semibold text-gray-900 dark:text-white">03/22</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-slate-500 mb-1 text-xs uppercase tracking-wider">Card Holder</p>
                <p className="font-semibold text-gray-900 dark:text-white">WilliamFacyson</p>
              </div>
              <div className="mt-auto">
                <p className="font-mono text-lg tracking-widest text-gray-400 dark:text-slate-400">
                  {showBalance ? '**** **** **** 1234' : '****'}
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-100 dark:bg-slate-950 rounded-full h-3 mt-8 overflow-hidden transition-colors duration-300">
              <div className="bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] h-full w-[40%] rounded-full shadow-[0_0_15px_rgba(58,123,213,0.5)] animate-pulse"></div>
            </div>
          </div>

          {/* Weekly Summary (Charts) */}
          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-transparent transition-all duration-500 delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Weekly Summary</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              <div className="flex items-center gap-6 w-full md:w-1/3">
                <div className="flex flex-col gap-4 w-full">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm hover:scale-105 transition-transform cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-500 dark:text-slate-400">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
                <div className="w-24 h-24 shrink-0 hover:scale-105 transition-transform duration-500">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="w-full md:w-2/3 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-slate-800 opacity-50" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} animationDuration={1500} />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={false} animationDuration={1500} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Payment History List */}
          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-lg border border-gray-100 dark:border-transparent transition-all duration-500 delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment History</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Showing {activeTab.toLowerCase()} transactions</p>
              </div>
              
              {/* Working Filters */}
              <div className="bg-gray-100 dark:bg-slate-950 rounded-full p-1 flex text-sm transition-colors duration-300">
                {['Monthly', 'Weekly', 'Today'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full font-medium transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-blue-600 dark:bg-[#5f45ff] text-white shadow-md scale-105' 
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full min-h-[250px]">
              {/* Added key based on activeTab to force a fade animation when tab changes */}
              <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {filteredHistory.map((tx) => {
                  const isExpanded = expandedRow === tx.id;
                  const isCanceled = tx.amount === -46.84;

                  return (
                    <div 
                      key={tx.id} 
                      className="border-b border-gray-100 dark:border-slate-800/50 last:border-0 transition-all duration-300 group"
                    >
                      <div 
                        className={`flex flex-wrap md:flex-nowrap items-center justify-between py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all duration-300 rounded-xl px-2 group-hover:translate-x-2 ${isExpanded ? 'bg-gray-50 dark:bg-slate-800/50' : ''}`}
                        onClick={() => setExpandedRow(isExpanded ? null : tx.id)}
                      >
                        <div className="flex items-center gap-4 w-full md:w-[30%] mb-3 md:mb-0">
                          <div className="relative">
                            <img src={`https://i.pravatar.cc/150?u=${tx.id}`} alt={tx.name} className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-800 transition-transform group-hover:scale-110" />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 ${tx.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}>
                              {tx.type === 'income' ? <ArrowDownLeft size={10} className="text-white"/> : <ArrowUpRight size={10} className="text-white"/>}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{tx.name}</p>
                            {isCanceled && <p className="text-[10px] text-gray-500 dark:text-slate-400">Online Shop</p>}
                          </div>
                        </div>

                        <div className="w-1/2 md:w-[25%] text-xs text-gray-500 dark:text-slate-400">
                          {tx.date}, 08:22 AM
                        </div>
                        
                        <div className="w-1/4 md:w-[15%] font-semibold text-sm text-gray-900 dark:text-white">
                          {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, {minimumFractionDigits: 0})}
                        </div>

                        <div className="hidden md:flex w-[15%] text-xs text-gray-400">
                          MasterCard 404
                        </div>

                        <div className="flex items-center justify-end w-1/4 md:w-[15%] gap-3">
                          <span className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isCanceled ? 'bg-red-100 text-red-600 dark:bg-[#ef4444] dark:text-white' : 
                            tx.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-[#34d399] dark:text-[#064e3b]' : 'bg-amber-100 text-amber-700 dark:bg-[#fbbf24] dark:text-[#78350f]'
                          }`}>
                            {isCanceled ? 'Canceled' : tx.type === 'income' ? 'Completed' : 'Pending'}
                          </span>
                          <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 md:px-8 pb-6 bg-gray-50/50 dark:bg-slate-950/50 rounded-b-xl border-t border-gray-100 dark:border-slate-800/50 animate-in slide-in-from-top-4 fade-in duration-300 transition-colors">
                          <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-10">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider">ID Payment</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">#00123521</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Payment Method</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2"><CreditCard size={14} className="text-blue-500"/> MasterCard 404</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Invoice Date</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">April 29, 2020</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Due Date</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">June 5, 2020</span>
                            </div>
                            <div className="ml-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-xl flex items-start gap-3 w-full md:w-auto max-w-xs transition-colors duration-300 hover:shadow-md">
                              <Info size={16} className="text-amber-500 dark:text-[#fbbf24] shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-600 dark:text-slate-400">Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-6">
          
          {/* Wallet Balance Card */}
          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm dark:shadow-lg border border-gray-100 dark:border-transparent relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-all duration-500 delay-100 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="absolute -top-10 -right-10 w-48 h-48 border border-gray-200 dark:border-gray-500/10 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-10 -right-20 w-48 h-48 border border-gray-200 dark:border-gray-500/10 rounded-full animate-pulse opacity-50" style={{animationDelay: '0.5s'}}></div>

            <div className="z-10">
              <div className="flex items-center gap-1 mb-6">
                 <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-400/50 dark:mix-blend-screen"></div>
                 <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-300/50 dark:mix-blend-screen -ml-4"></div>
              </div>
              <h1 className="text-4xl font-semibold mb-2 text-gray-900 dark:text-white transition-all duration-300">
                {showBalance ? '$824,571.93' : '****'}
              </h1>
              <p className="text-gray-500 dark:text-slate-400 text-sm">Wallet Balance</p>
              <p className="text-[10px] text-green-600 dark:text-slate-500 mt-4">+0.8% than last week</p>
            </div>

            <div className="flex gap-4 mt-8 z-10 h-28">
              <button 
                onClick={() => alert("Send Invoices Clicked!")}
                className="group flex-1 bg-blue-600 dark:bg-[#5f45ff] hover:bg-blue-700 dark:hover:bg-[#5035e0] rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300 shadow-md dark:shadow-[0_10px_20px_rgba(95,69,255,0.3)] border border-blue-700 dark:border-[#5f45ff] hover:-translate-y-1 active:scale-95"
              >
                <div className="bg-pink-500 dark:bg-[#ff4b91] p-3 rounded-xl text-white transition-transform group-hover:scale-110">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-medium text-white">Send Invoices</span>
              </button>
              <button 
                onClick={() => alert("Transfer Clicked!")}
                className="group flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <div className="bg-indigo-100 dark:bg-slate-900 p-3 rounded-xl text-indigo-600 dark:text-slate-400 border border-indigo-200 dark:border-slate-600 transition-transform group-hover:scale-110">
                  <Upload size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-slate-400">Transfer</span>
              </button>
            </div>
          </div>

          {/* Working Invoices Sent List */}
          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm dark:shadow-lg border border-gray-100 dark:border-transparent flex-1 transition-all duration-500 delay-300 flex flex-col ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Invoices Sent</h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">Showing {invoiceLimit} latest invoices</p>

            <div className="flex flex-col gap-5 mb-8 flex-1">
              {displayedInvoices.map((invoice, i) => (
                <div 
                  key={`inv-${invoice.id}-${i}`} 
                  className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-slate-800 p-2 -mx-2 rounded-xl transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-top-2"
                >
                  <div className="flex items-center gap-3">
                    {/* Unique avatar index to ensure pictures look different even when duplicating data */}
                    <img src={`https://i.pravatar.cc/150?img=${(i % 10) + 10}`} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200 dark:border-slate-800 transition-transform group-hover:scale-110" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {invoice.name} {['Ignis', 'Store', 'Roberto', 'Wong', 'Johan', 'Corp', 'Tech', 'Labs'][i % 8]}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400">{[4, 7, 4, 4, 4, 2, 5, 1][i % 8]}h ago</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    ${[562, 672, 769, 45, 776, 320, 150, 890][i % 8]}
                  </span>
                </div>
              ))}
            </div>

            {/* Working View More Button */}
            <button 
              onClick={toggleInvoiceView}
              className="w-full mt-auto py-4 bg-blue-600 dark:bg-[#5f45ff] hover:bg-blue-700 dark:hover:bg-[#5035e0] text-white rounded-2xl font-medium text-sm transition-all duration-300 shadow-md dark:shadow-lg border-blue-700 dark:border-[#5f45ff] hover:-translate-y-1 active:scale-95"
            >
              {invoiceLimit === 4 ? 'View More' : 'View Less'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}