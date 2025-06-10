import type { Transaction } from '../context/TransactionsContext';

export function getAllLocalStorageItems(): Record<string, Transaction> {
  const storageData: Record<string, Transaction> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          // Пытаемся распарсить значение как JSON
          storageData[key] = JSON.parse(value);
        } catch (error) {
          // Если парсинг не удался, сохраняем как строку
          console.error(
            `Ошибка при парсинге значения для ключа ${key}:`,
            error
          );
        }
      }
    }
  }
  return storageData;
}

function getValuesFromObject(obj: Record<string, Transaction>): Transaction[] {
  return Object.values(obj);
}

export function getLocalStorageArray() {
  return getValuesFromObject(getAllLocalStorageItems());
}

export function saveTransactionsToLocalStorage(
  transactions: Transaction[]
): void {
  transactions.forEach((transaction) => {
    if (transaction.key) {
      try {
        localStorage.setItem(transaction.key, JSON.stringify(transaction));
      } catch (error) {
        console.error(
          `Ошибка при сохранении транзакции с ключом ${transaction.key}:`,
          error
        );
      }
    } else {
      console.warn(
        'Транзакция пропущена: отсутствует уникальный ключ',
        transaction
      );
    }
  });
}

export function saveOneTransactionToLocalStorage(
  transaction: Transaction
): boolean {
  if (transaction.key) {
    try {
      localStorage.setItem(transaction.key, JSON.stringify(transaction));
      return true;
    } catch (error) {
      console.error(
        `Ошибка при сохранении транзакции с ключом ${transaction.key}:`,
        error
      );
    }
  } else {
    console.warn(
      'Транзакция пропущена: отсутствует уникальный ключ',
      transaction
    );
  }
  return false;
}
