import React from 'react';
import { PlusCircle, ChevronDown, Target, ShieldCheck, Car, Home } from 'lucide-react';

const iconMap: Record<string, any> = { 'ShieldCheck': ShieldCheck, 'Car': Car, 'Home': Home, 'Target': Target };

interface SavingsGoalsPanelProps {
  savingsGoals: any[];
  role: 'admin' | 'viewer';
  onAddGoal: () => void;
  animateProgress: boolean;
}

export const SavingsGoalsPanel = ({ savingsGoals, role, onAddGoal, animateProgress }: SavingsGoalsPanelProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-base font-bold">Savings Goals</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Active portfolios</p>
        </div>
        <div className="flex items-center gap-2">
          {role === 'admin' && (
            <button onClick={onAddGoal} className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Add New Goal">
              <PlusCircle className="w-5 h-5" />
            </button>
          )}
          <span className="text-xs bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-3 py-1.5 rounded-lg font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition hidden sm:inline-block">Q3 Goals <ChevronDown className="inline w-3 h-3 ml-1"/></span>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {savingsGoals.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">No active goals.</div>
        ) : (
          savingsGoals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
            const GoalIcon = iconMap[goal.iconName] || Target;
            return (
              <div key={goal.id} className="group p-3 sm:p-4 rounded-2xl bg-gray-50/50 dark:bg-slate-700/20 border border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-all hover:shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl text-white ${goal.color} shadow-sm`}><GoalIcon className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[100px] sm:max-w-[120px]">{goal.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400">Target: ${goal.target.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">${goal.current.toLocaleString()}</span>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{goal.timeLeft}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden flex items-center shadow-inner relative">
                  <div className={`${goal.color} h-full transition-all duration-[1500ms] ease-out relative`} style={{ width: animateProgress ? `${percentage}%` : '0%' }}>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-full h-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-end mt-1"><span className="text-[10px] font-bold text-gray-500 dark:text-slate-400">{percentage}% Complete</span></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};