import React, { useContext } from 'react';
import Navbar from './component/Navbar';
import { Outlet } from 'react-router';
import Footer from './component/Footer';
import { ThemeContext } from './context/ThemeContext';

const Layout = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1 bg-background text-foreground">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;