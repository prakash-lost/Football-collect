import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import { ThemeContext } from "./context/ThemeContext";

const Layout = () => {
  const { isDark } = useContext(ThemeContext);
  const { pathname } = useLocation();

  // 1. Sync .dark class to <html> so popups/modals inherit dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // 2. Auto scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={isDark ? "dark" : ""}>
      {/* 'flex flex-col' guarantees the footer always stays at the bottom */}
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-primary/20 selection:text-primary">
        <Navbar />

        {/* 'flex-1' expands to fill available height */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
