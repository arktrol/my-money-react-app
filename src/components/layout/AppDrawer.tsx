import { Drawer } from 'antd';
import AppMenu from '../AppMenu';

export default function AppDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      style={{ background: '#001529', color: 'white' }}
      title="My Money React App"
      closable={{ 'aria-label': 'Close Button' }}
      onClose={onClose}
      open={open}
      placement={'left'}
    >
      <AppMenu />
    </Drawer>
  );
}
