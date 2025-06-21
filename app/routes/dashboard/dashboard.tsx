import { useAuth } from '@/hooks/auth/useAuth';
import ProtectedRoute from '@/components/protected-route';

export default function Dashboard() {
  const { logout, isLogoutPending, user, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p>{isAuthenticated ? `Bem-vindo, ${user?.name}` : 'Você não está autenticado'}</p>
        <button
          className='rounded-md bg-red-500 px-4 py-2 text-white'
          onClick={handleLogout}
          disabled={isLogoutPending}
        >
          Sair
        </button>
      </div>
    </ProtectedRoute>
  );
}
