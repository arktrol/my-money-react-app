import { Button, theme, Flex, Space, Tag, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import TransactionModal from '../TransactionModal';
import { useState } from 'react';
import { useTransactions } from '../../context/TransactionsContext';

export default function AppHeader({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const AppHeaderStyle = {
    padding: 0,
    background: colorBgContainer,
    paddingRight: 16,
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);
  const { balance } = useTransactions();

  return (
    <Header style={AppHeaderStyle}>
      <Flex gap="middle" align="center" justify="space-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <Space>
          <Typography.Title style={{ marginBottom: '0.2em' }} level={4}>
            Всего денег:{' '}
          </Typography.Title>
          <Tag color={balance > 0 ? 'green' : 'red'}>{balance}</Tag>
          <TransactionModal modal={modal} toggleModal={toggleModal} />
        </Space>
      </Flex>
    </Header>
  );
}
