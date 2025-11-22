import NavbarMenu from '@/components/navbar-menu';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './components/Loading';
import { authClient } from './lib/authClient';

const AppLayout = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) return <Loading overlay />;
  if (!data) return <Navigate to={'/auth/signin'} />;
  return (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  );
};

export default AppLayout;
