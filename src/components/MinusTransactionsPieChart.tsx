import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTransactions } from '../context/TransactionsContext';
import { groupAndSumSpendTransactions } from '../utils/analiticsFunc';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MinusTransactionsPieChart() {
  const { transactions } = useTransactions();

  const data = {
    labels: groupAndSumSpendTransactions(transactions).map((el) => el.name),
    datasets: [
      {
        label: '# of amount',
        data: groupAndSumSpendTransactions(transactions).map((el) => el.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'center',
        height: 400,
      }}
    >
      <Pie data={data} />
    </div>
  );
}
