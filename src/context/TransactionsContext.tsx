import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { localHostFetchTransactions } from '../api';
import { capitalize } from '../utils/defaultUtils';
import { calcBalance } from '../utils/calcBalance';

const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  loading: false,
  toggleCreated: () => {},
  balance: 0,
});

type TransactionsContextType = {
  transactions: Transaction[];
  loading: boolean;
  toggleCreated: () => void;
  balance: number;
};

export type Transaction = {
  key: string;
  name: string;
  date: string;
  type: string;
  amount: number;
  description: string | undefined;
};

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [balance, setBalance] = useState(0);
  const toggleCreated = () => setCreated((prev) => !prev);

  // setBalance(23);

  function transactionsMap(transactions: Transaction[]): Transaction[] {
    return transactions.map((transaction): Transaction => {
      return {
        ...transaction,
        name: capitalize(transaction.name),
        type: capitalize(transaction.type),
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const newTransactions = await localHostFetchTransactions();
      setTransaction(() => transactionsMap(newTransactions));
      setBalance(calcBalance(newTransactions));
      setLoading(false);
    }
    preload();
  }, [created]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, loading, toggleCreated, balance }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider'
    );
  }
  return context;
};
