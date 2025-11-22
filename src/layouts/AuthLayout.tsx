import Loading from '@/components/Loading';
import { authClient } from '@/lib/authClient';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const { data, isPending } = authClient.useSession();

  if (isPending) return <Loading overlay />;
  if (data) return <Navigate to={'/'} />;
  return <Outlet />;
}
