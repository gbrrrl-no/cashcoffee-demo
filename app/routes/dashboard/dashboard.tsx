import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/register');
  }, [navigate]);

  return <div>Dashboard</div>;
}
