import { Spin, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigation } from '../../context/NavigationContext';
import type { ReactNode } from 'react';

export default function AppContent({ children }: { children: ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const AppContentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: '100vh',
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  const { navLoading } = useNavigation();

  return (
    <Content style={AppContentStyle}>
      {navLoading ? <Spin fullscreen /> : <>{children}</>}
    </Content>
  );
}
