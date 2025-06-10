import type { FormProps } from 'antd';
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Input,
  Select,
  Result,
} from 'antd';
import {
  useTransactions,
  type Transaction,
} from '../context/TransactionsContext';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { localHostPostTransaction } from '../api';
import { capitalize, generateUniqueKey } from '../utils/defaultUtils';
import { useRef, useState } from 'react';

type TransactionFormProps = {
  toggleModal: () => void;
};

export default function TransactionForm({ toggleModal }: TransactionFormProps) {
  const { toggleCreated } = useTransactions();
  const [success, setSucces] = useState(false);
  const transactionRef = useRef<Transaction>({
    key: '',
    name: '',
    date: '',
    type: '',
    amount: 0,
    description: '',
  });

  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY-MM-DD';

  const onFinish: FormProps<Transaction>['onFinish'] = (values) => {
    const newTransaction: Transaction = {
      ...values,
      date: new Date(values.date ? new Date() : values.date).toISOString(),
      key: generateUniqueKey(),
    };
    async function preload() {
      const response: boolean = await localHostPostTransaction(newTransaction);
      if (response) {
        transactionRef.current = newTransaction;
        toggleCreated();
        setSucces((prev) => !prev);
      }
    }
    preload();
    console.log('Success:', newTransaction);
  };

  const onFinishFailed: FormProps<Transaction>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  if (success) {
    return (
      <Result
        status="success"
        title="Добавлена новая транзакция"
        subTitle={
          'Пользователь ' +
          capitalize(transactionRef.current.name) +
          ' сделал транзакцию ' +
          transactionRef.current.type +
          ' на сумму: ' +
          transactionRef.current.amount +
          ' рублей. ' +
          '\n' +
          ' Дата: ' +
          transactionRef.current.date +
          '\n' +
          (transactionRef.current.description
            ? 'Описание: ' + transactionRef.current.description
            : '')
        }
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              setSucces(false);
              toggleModal();
            }}
          >
            К таблице
          </Button>,
        ]}
      />
    );
  }

  return (
    <Form
      name="newTransaction"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        name: 'толя',
        type: 'пополнение',
        date: dayjs(new Date().toISOString().slice(0, 10), dateFormat),
        amount: 0,
      }}
    >
      <Form.Item<Transaction>
        label="Пользователь"
        name="name"
        rules={[{ required: true, message: 'Выберите пользователя!' }]}
      >
        <Select
          options={[
            { value: 'толя', label: 'Толя' },
            { value: 'тёма', label: 'Тёма' },
            { value: 'мама', label: 'Мама' },
            { value: 'папа', label: 'Папа' },
          ]}
        />
      </Form.Item>

      <Form.Item<Transaction> label="Дата" name="date">
        <DatePicker />
      </Form.Item>
      <Form.Item<Transaction>
        label="Тип транзакции"
        name="type"
        rules={[{ required: true, message: 'Выберите тип транзакции!' }]}
      >
        <Select
          options={[
            { value: 'пополнение', label: 'Пополнение' },
            { value: 'списание', label: 'Списание' },
          ]}
        />
      </Form.Item>
      <Form.Item<Transaction>
        label="Количество рублей"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Количество должно быть больше 0!',
            type: 'number',
            min: 1,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<Transaction> label="Описание" name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
}
