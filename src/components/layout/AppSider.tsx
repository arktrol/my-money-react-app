import Sider from 'antd/es/layout/Sider';
import AppMenu from '../AppMenu';

const AppSiderStyleLogo = {
  height: 32,
  margin: 16,
  background: 'rgba(255, 255, 255, .2)',
  borderRadius: 6,
};

export default function AppSider({ collapsed }: { collapsed: boolean }) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={AppSiderStyleLogo} />
      <AppMenu />
    </Sider>
  );
}
