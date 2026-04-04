import React from 'react';
import { X } from 'lucide-react';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newGoal: { name: string; target: string; current: string };
  setNewGoal: React.Dispatch<React.SetStateAction<any>>;
}

export const GoalModal = ({ isOpen, onClose, onSubmit, newGoal, setNewGoal }: GoalModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-slate-800 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Add Savings Goal</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Name</label>
            <input type="text" required value={newGoal.name} onChange={e => setNewGoal({...newGoal, name: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Vacation" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Amount ($)</label>
              <input type="number" step="1" required value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="10000" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Saved ($)</label>
              <input type="number" step="1" required value={newGoal.current} onChange={e => setNewGoal({...newGoal, current: e.target.value})} className="w-full px-3 sm:px-4 py-2 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="500" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-xl transition-all mt-4 sm:mt-6 shadow-sm">Save Goal</button>
        </form>
      </div>
    </div>
  );
};