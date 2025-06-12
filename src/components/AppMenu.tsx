import { DollarTwoTone, ExperimentTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigation } from '../context/NavigationContext';

export default function AppMenu() {
  const { navigateTo } = useNavigation();
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      onClick={({ key }) => navigateTo(key)}
      items={[
        {
          key: '/my-money-react-app/',
          icon: <DollarTwoTone />,
          label: 'Транзакции',
        },
        {
          key: '/my-money-react-app/analitics',
          icon: <ExperimentTwoTone />,
          label: 'Аналитика',
        },
      ]}
    />
  );
}
