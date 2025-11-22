import NavbarMenu from '@/components/navbar-menu';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  );
};

export default AppLayout;
