'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Check, Calendar, X } from 'lucide-react';

// --- Extended Mock Data ---
import { extendedTransactions } from '../../data/mockData'; // Import the extended transactions data
export default function TransactionsPage() {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  
  // Status Filter State
  const [statusFilter, setStatusFilter] = useState('All');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  
  // Date Filter State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  // --- Search & Filter Logic ---
  const filteredTransactions = useMemo(() => {
    return extendedTransactions.filter(tx => {
      // 1. Text Search Match
      const matchesSearch = 
        tx.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tx.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Dropdown Status Match
      const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;

      // 3. Date Range Match
      let matchesDate = true;
      const txDate = new Date(tx.date); // Converts "22 Jan, 2025" to a real Date object

      if (startDate) {
        matchesDate = matchesDate && txDate >= new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include the whole end day
        matchesDate = matchesDate && txDate <= end;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, statusFilter, startDate, endDate]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); 
    setIsStatusMenuOpen(false); 
  };

  // Format date for the button display (e.g. "Jan 10 - Jan 22")
  const formatDateDisplay = () => {
    if (startDate && endDate) {
      return `${new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    if (startDate) return `From ${new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    if (endDate) return `Until ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    return 'Date Range';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-900 dark:text-slate-300 transition-colors duration-300">
      
      {/* Invisible overlay to close dropdowns when clicking outside */}
      {(isStatusMenuOpen || isDateMenuOpen) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => { setIsStatusMenuOpen(false); setIsDateMenuOpen(false); }}
        ></div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
            All transactions
          </h1>
          
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Bar */}
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full md:w-64 pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white shadow-sm"
              />
            </div>

            {/* Date Filter Dropdown */}
            <div className="relative z-20">
              <button 
                onClick={() => { setIsDateMenuOpen(!isDateMenuOpen); setIsStatusMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl transition-colors shadow-sm font-medium text-sm ${
                  startDate || endDate 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300'
                }`}
              >
                <Calendar size={16} className={startDate || endDate ? 'text-blue-500' : 'text-gray-400'} /> 
                {formatDateDisplay()}
              </button>

              {/* Date Popover */}
              {isDateMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-4">
                     <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Filter by Date</p>
                     {(startDate || endDate) && (
                       <button 
                         onClick={() => { setStartDate(''); setEndDate(''); setCurrentPage(1); }} 
                         className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center"
                       >
                         <X size={14} className="mr-1"/> Clear
                       </button>
                     )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">From</label>
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:[color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">To</label>
                      <input 
                        type="date" 
                        value={endDate}
                        min={startDate} // Prevent selecting an end date before the start date
                        onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
                        className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Status Filter Dropdown */}
            <div className="relative z-20">
              <button 
                onClick={() => { setIsStatusMenuOpen(!isStatusMenuOpen); setIsDateMenuOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl transition-colors shadow-sm font-medium text-sm ${
                  statusFilter !== 'All' 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400' 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300'
                }`}
              >
                {statusFilter === 'All' ? 'Status' : statusFilter} <Filter size={16} />
              </button>

              {isStatusMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 pb-2 mb-2 border-b border-gray-100 dark:border-slate-700">
                    <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Filter by status</p>
                  </div>
                  {['All', 'Successful', 'Pending', 'Failed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-slate-300"
                    >
                      <span>{status}</span>
                      {statusFilter === status && <Check size={16} className="text-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm dark:shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-slate-800 text-sm text-gray-500 dark:text-slate-400">
                  <th className="py-5 px-6 font-medium">Transaction title</th>
                  <th className="py-5 px-6 font-medium">Description</th>
                  <th className="py-5 px-6 font-medium">Type</th>
                  <th className="py-5 px-6 font-medium">Amount</th>
                  <th className="py-5 px-6 font-medium">Date</th>
                  <th className="py-5 px-6 font-medium">Status</th>
                  <th className="py-5 px-6 font-medium"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentItems.length > 0 ? (
                  currentItems.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group animate-in fade-in duration-300">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/150?img=${tx.avatarId}`} alt={tx.name} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 object-cover" />
                          <span className="font-medium text-gray-900 dark:text-white">{tx.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 dark:text-slate-400">{tx.description}</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-slate-400">{tx.type}</td>
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">${tx.amount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-gray-500 dark:text-slate-400">{tx.date}</td>
                      <td className="py-4 px-6 font-medium">
                        <span className={`${tx.status === 'Successful' && 'text-emerald-600 dark:text-emerald-500'} ${tx.status === 'Pending' && 'text-amber-600 dark:text-amber-500'} ${tx.status === 'Failed' && 'text-rose-600 dark:text-rose-500'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500 dark:text-slate-400">
                      <p className="text-lg font-medium mb-1">No transactions found</p>
                      <p className="text-sm">Try adjusting your search or date/status filters.</p>
                      {(startDate || endDate || statusFilter !== 'All' || searchQuery) && (
                        <button 
                          onClick={() => { setStartDate(''); setEndDate(''); setStatusFilter('All'); setSearchQuery(''); setCurrentPage(1); }}
                          className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm font-medium"
                        >
                          Clear all filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}