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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default PublicLayout;
