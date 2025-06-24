import ProtectedRoute from '@/components/ProtectedRoute';
import { Outlet } from 'react-router';

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
