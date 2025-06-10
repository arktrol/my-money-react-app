import { Button, Modal } from 'antd';
import { useState } from 'react';
import TransactionForm from './TransactionForm';

export default function TransactionModal({
  modal,
  toggleModal,
}: {
  modal: boolean;
  toggleModal: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  const showLoading = () => {
    toggleModal();
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <Button type="primary" onClick={showLoading}>
        Добавить транзакцию
      </Button>
      <Modal
        title={<p>Новая транзакция</p>}
        footer={null}
        loading={loading}
        open={modal}
        onCancel={toggleModal}
      >
        <TransactionForm toggleModal={toggleModal} />
      </Modal>
    </>
  );
}
