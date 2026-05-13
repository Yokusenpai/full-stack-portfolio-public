import { Outlet } from 'react-router';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { ThemeProvider } from '../../components/theme-provider';

const PublicLayout = () => {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        <Navbar />
        <Outlet />
        <Footer />
      </ThemeProvider>
  );
};

export default PublicLayout;
