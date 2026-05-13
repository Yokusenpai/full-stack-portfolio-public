import { Outlet } from 'react-router';
import { ThemeProvider } from '../../components/theme-provider';

const AdminLayout = () => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <Outlet />
    </ThemeProvider>
  );
};

export default AdminLayout;
