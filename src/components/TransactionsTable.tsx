import { Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import {
  useTransactions,
  type Transaction,
} from '../context/TransactionsContext';

const columns: TableColumnsType<Transaction> = [
  {
    title: 'Имя',
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    filters: [
      {
        text: 'Толя',
        value: 'Толя',
      },
      {
        text: 'Тёма',
        value: 'Тёма',
      },
      {
        text: 'Мама',
        value: 'Мама',
      },
      { text: 'Папа', value: 'Папа' },
    ],
    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    render: (date: string) => date.substring(0, 10),
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: 'Тип транзакции',
    dataIndex: 'type',
    showSorterTooltip: { target: 'full-header' },
    filters: [
      { text: 'Пополнение', value: 'Пополнение' },
      { text: 'Списание', value: 'Списание' },
    ],
    render: (type: string) => {
      if (type === 'Списание') {
        return <Tag color="red">{type}</Tag>;
      }
      return <Tag color="green">{type}</Tag>;
    },
    onFilter: (value, record) => record.type.indexOf(value as string) === 0,
  },
  {
    title: 'Количество рублей',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Описание',
    dataIndex: 'description',
  },
];

export default function TransactionTable() {
  const { transactions, loading } = useTransactions();
  return (
    <Table<Transaction>
      columns={columns}
      dataSource={transactions}
      showSorterTooltip={{ target: 'sorter-icon' }}
      loading={loading}
    />
  );
}
