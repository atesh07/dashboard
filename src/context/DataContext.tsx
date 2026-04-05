"use client";

import React, { createContext, useContext, useState } from "react";
// Adjust the path below if your mockData file is in a different location
import { 
  cashflowData as initialCashflow, 
  initialSavingsGoals, 
  extendedTransactions, 
  PIE_COLORS 
} from "../data/mockData";

// 1. Define Types based on your mock data
export type Transaction = typeof extendedTransactions[0];
export type SavingsGoal = typeof initialSavingsGoals[0];
export type Cashflow = typeof initialCashflow[0];

// Define what the Context makes available to the rest of the app
interface DataContextType {
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  cashflowData: Cashflow[];
  pieColors: string[];
  
  // Functions to modify the data
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, "id">) => void;
}

// 2. Create the Context
const DataContext = createContext<DataContextType | undefined>(undefined);

// 3. Create the Provider Component
export function DataProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with your mock data
  const [transactions, setTransactions] = useState<Transaction[]>(extendedTransactions);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [cashflowData] = useState<Cashflow[]>(initialCashflow); 
  const pieColors = PIE_COLORS;

  // Add a new transaction to the top of the list
  const addTransaction = (newTx: Omit<Transaction, "id">) => {
    const transaction = {
      ...newTx,
      id: Date.now(), // Generate a unique ID
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  // Add a new savings goal
  const addSavingsGoal = (newGoal: Omit<SavingsGoal, "id">) => {
    const goal = {
      ...newGoal,
      id: Date.now(),
    };
    setSavingsGoals((prev) => [...prev, goal]);
  };

  return (
    <DataContext.Provider 
      value={{ 
        transactions, 
        savingsGoals, 
        cashflowData, 
        pieColors, 
        addTransaction, 
        addSavingsGoal 
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// 4. Custom Hook for easy access
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};