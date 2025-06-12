import { useState } from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import AppSider from '../../components/layout/AppSider';
import AppHeader from '../../components/layout/AppHeader';
import AppContent from '../../components/layout/AppContent';
import TransactionPage from '../../pages/TransactionPage';
import AnaliticsPage from '../../pages/AnaliticsPage';
import useMediaQuery from '../../hooks/useMediaQuery';
import AppDrawer from './AppDrawer';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Layout>
      {!isMobile && <AppSider collapsed={collapsed} />}
      {isMobile && <AppDrawer open={collapsed} onClose={toggleCollapsed} />}
      <Layout>
        <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <AppContent>
          <Routes>
            <Route path="/my-money-react-app/" element={<TransactionPage />} />
            <Route
              path="/my-money-react-app/analitics"
              element={<AnaliticsPage />}
            />
          </Routes>
        </AppContent>
      </Layout>
    </Layout>
  );
}
