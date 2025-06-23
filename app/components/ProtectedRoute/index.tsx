import { useAuth } from '@/hooks/auth/useAuth';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authenticate } = useAuth();

  useEffect(() => {
    authenticate();
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
