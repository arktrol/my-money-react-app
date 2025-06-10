import { Card, Col, Layout, Row } from 'antd';
import PlusTransactionsPieChart from '../components/PlusTransactionsPieChart';
import MinusTransactionsPieChart from '../components/MinusTransactionsPieChart';

export default function AnaliticsPage() {
  return (
    <Layout.Content>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Сумма пополнений" variant="borderless">
            <PlusTransactionsPieChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Сумма списаний" variant="borderless">
            <MinusTransactionsPieChart />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}
