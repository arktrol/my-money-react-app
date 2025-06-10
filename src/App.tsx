import AppLayout from './components/layout/AppLayout';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';
import { TransactionsProvider } from './context/TransactionsContext';

export default function App() {
  return (
    <Router>
      <NavigationProvider>
        <TransactionsProvider>
          <AppLayout />
        </TransactionsProvider>
      </NavigationProvider>
    </Router>
  );
}
