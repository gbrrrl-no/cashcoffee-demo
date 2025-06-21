import { Outlet } from 'react-router';
import { useAuth } from '@/hooks/auth/useAuth';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { authenticate } = useAuth();

  useEffect(() => {
    authenticate();
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
