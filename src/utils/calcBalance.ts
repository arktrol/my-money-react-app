import type { Transaction } from '../context/TransactionsContext';

export function calcBalance(transactions: Transaction[]): number {
  let balance = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'списание') {
      balance -= transaction.amount;
    } else if (transaction.type === 'пополнение') {
      balance += transaction.amount;
    }
  }
  return balance;
}

export function getBalance(transaction: Transaction, balance: number): number {
  if (transaction.type === 'списание') {
    balance -= transaction.amount;
  } else if (transaction.type === 'пополнение') {
    balance += transaction.amount;
  }
  return balance;
}
