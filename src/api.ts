import type { Transaction } from './context/TransactionsContext';
import { transactions } from './data';
import {
  getTransactionsArray,
  saveOneTransactionToLocalStorage,
} from './utils/localStorageMethods';

export function mockFetchTransactions() {
  return new Promise<Transaction[]>((resolve) => {
    setTimeout(() => resolve(transactions), 2000);
  });
}

export function localHostFetchTransactions() {
  return new Promise<Transaction[]>((resolve) => {
    setTimeout(() => resolve(getTransactionsArray()), 2000);
  });
}

export function localHostPostTransaction(transaction: Transaction) {
  return new Promise<boolean>((resolve) => {
    setTimeout(
      () => resolve(saveOneTransactionToLocalStorage(transaction)),
      2000
    );
  });
}
