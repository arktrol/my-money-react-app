import { useState } from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import AppSider from '../../components/layout/AppSider';
import AppHeader from '../../components/layout/AppHeader';
import AppContent from '../../components/layout/AppContent';
import TransactionPage from '../../pages/TransactionPage';
import AnaliticsPage from '../../pages/AnaliticsPage';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  return (
    <Layout>
      <AppSider collapsed={collapsed} />
      <Layout>
        <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <AppContent>
          <Routes>
            <Route path="/" element={<TransactionPage />} />
            <Route path="/analitics" element={<AnaliticsPage />} />
          </Routes>
        </AppContent>
      </Layout>
    </Layout>
  );
}
