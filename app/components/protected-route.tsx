import { useAuthenticateUser } from '@/queries/auth';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/features/auth/authSlice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRouteAuth>{children}</ProtectedRouteAuth>
    </Suspense>
  );
};

const ProtectedRouteAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data } = useAuthenticateUser();

  useEffect(() => {
    dispatch(loginSuccess({ user: data }));
  }, [dispatch, data]);

  return <>{children}</>;
};

export default ProtectedRoute;
