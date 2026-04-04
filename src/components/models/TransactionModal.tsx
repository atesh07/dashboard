import React from 'react';
import { X } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newTx: { name: string; amount: string; type: 'income' | 'expense' | string; category: string };
  setNewTx: React.Dispatch<React.SetStateAction<any>>;
}

export const TransactionModal = ({ isOpen, onClose, onSubmit, newTx, setNewTx }: TransactionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-slate-800 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Add Transaction</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name / Source</label>
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
              <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-xl transition-all mt-4 sm:mt-6 shadow-sm">Save Transaction</button>
        </form>
      </div>
    </div>
  );
};