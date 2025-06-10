import type { Transaction } from '../context/TransactionsContext';

// TODO ------------------оптимизировать функции, чтобы не было дублирования кода. Как вариант закидывать дополнительный прм типа булеан
export function groupAndSumTransactions(
  transactions: Transaction[]
): { name: string; amount: number }[] {
  const groupedTransactions = transactions.reduce(
    (acc: { [name: string]: number }, transaction) => {
      const { name, amount, type } = transaction;
      const signedAmount = type === 'Списание' ? -amount : amount; // Учитываем тип транзакции
      acc[name] = (acc[name] || 0) + signedAmount;
      console.log(type);
      return acc;
    },
    {}
  );
  return Object.entries(groupedTransactions).map(([name, amount]) => ({
    name,
    amount,
  }));
}

export function groupAndSumSpendTransactions(
  transactions: Transaction[]
): { name: string; amount: number }[] {
  const groupedTransactions = transactions.reduce(
    (acc: { [name: string]: number }, transaction) => {
      const { name, amount, type } = transaction;
      const signedAmount = type === 'Списание' ? amount : 0; // Учитываем тип транзакции
      acc[name] = (acc[name] || 0) + signedAmount;
      console.log(type);
      return acc;
    },
    {}
  );
  return Object.entries(groupedTransactions).map(([name, amount]) => ({
    name,
    amount,
  }));
}
