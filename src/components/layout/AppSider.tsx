import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import { DollarTwoTone, ExperimentTwoTone } from '@ant-design/icons';
import { useNavigation } from '../../context/NavigationContext';

const AppSiderStyleLogo = {
  height: 32,
  margin: 16,
  background: 'rgba(255, 255, 255, .2)',
  borderRadius: 6,
};

export default function AppSider({ collapsed }: { collapsed: boolean }) {
  const { navigateTo } = useNavigation();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={AppSiderStyleLogo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={({ key }) => navigateTo(key)}
        items={[
          {
            key: '/',
            icon: <DollarTwoTone />,
            label: 'Транзакции',
          },
          {
            key: '/analitics',
            icon: <ExperimentTwoTone />,
            label: 'Аналитика',
          },
        ]}
      />
    </Sider>
  );
}
