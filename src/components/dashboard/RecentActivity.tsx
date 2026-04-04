import React from 'react';
import { Search, Plus, ArrowUpDown } from 'lucide-react';

interface RecentActivityProps {
  filteredTransactions: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: 'all' | 'income' | 'expense';
  setFilterType: (type: 'all' | 'income' | 'expense') => void;
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (order: 'newest' | 'oldest' | ((prev: 'newest' | 'oldest') => 'newest' | 'oldest')) => void;
  role: 'admin' | 'viewer';
  onAdd: () => void;
}

export const RecentActivity = ({ filteredTransactions, searchQuery, setSearchQuery, filterType, setFilterType, sortOrder, setSortOrder, role, onAdd }: RecentActivityProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col flex-1 min-h-[350px] w-full">
      <div className="flex justify-between items-center mb-4">
      <h3 className="text-base font-bold">Recent Activity</h3>
      {role === 'admin' && (
        <button onClick={onAdd} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 px-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center font-medium">
          <Plus className="w-4 h-4 mr-1" /> Add
        </button>
      )}
      </div>
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex bg-gray-100 dark:bg-slate-900 p-1 rounded-lg flex-1 overflow-x-auto hide-scrollbar">
            {(['all', 'income', 'expense'] as const).map(f => (
              <button key={f} onClick={() => setFilterType(f)} className={`flex-1 min-w-[60px] py-1.5 text-[10px] sm:text-xs font-medium rounded-md capitalize transition-all ${filterType === f ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500'}`}>{f}</button>
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
  );
};