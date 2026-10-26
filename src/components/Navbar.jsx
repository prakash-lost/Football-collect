import React, { lazy, Suspense, useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { FaSearch } from "react-icons/fa";
import { Menu, X, Sun, Moon, User, ArrowRight } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { ThemeContext } from "../context/ThemeContext";

const LoginForm = lazy(() => import("../pages/LoginForm"));

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Teams", path: "/teams" },
  { label: "Players", path: "/players" },
  { label: "Leagues", path: "/leagues" },
  { label: "News", path: "/news" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const location = useLocation?.() || { pathname: "/" };

  // Detect scroll to add extra shadow & blur depth
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/5"
            : "bg-background/95 sm:bg-background/80 backdrop-blur-md border-b border-border/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* ---------- BRAND LOGO ---------- */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors shadow-inner">
                <img
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                  src="/footballlogo.png"
                  alt="Football Hub Logo"
                  onError={(e) => {
                    // Fallback emoji if image missing
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span className="hidden text-xl">⚽</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground flex items-center gap-1.5 font-sans">
                  FOOTBALL<span className="text-primary font-black">HUB</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hidden sm:block -mt-1">
                  Collect & Stats
                </span>
              </div>
            </Link>

            {/* ---------- DESKTOP NAVIGATION LINKS ---------- */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ---------- RIGHT ACTIONS: SEARCH + THEME + AUTH ---------- */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Desktop Search Bar */}
              <div className="hidden lg:flex items-center relative">
                <FaSearch className="absolute left-3.5 text-muted-foreground text-xs pointer-events-none" />
                <input
                  name="search"
                  className="w-48 xl:w-56 h-9 pl-9 pr-4 rounded-full text-xs bg-muted/50 border border-border/70 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:w-64 transition-all duration-300"
                  placeholder="Search clubs, players..."
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* Mobile Search Toggle Button */}
              <button
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
                aria-label="Toggle search"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
              >
                <FaSearch className="text-base" />
              </button>

              {/* Theme Toggle Pill */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60 border border-border/60">
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-primary animate-in fade-in duration-200" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500 animate-in fade-in duration-200" />
                )}
                <Switch
                  checked={isDark}
                  onCheckedChange={setIsDark}
                  aria-label="Toggle dark mode"
                  className="scale-90"
                />
              </div>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2.5">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-foreground hover:text-primary hover:bg-accent/60 border border-border/80 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  Profile
                </Link>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:opacity-95 hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer"
                >
                  Sign In
                </button>
              </div>

              {/* Mobile Menu Hamburger Button */}
              <button
                className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent/60 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---------- MOBILE EXPANDABLE SEARCH ---------- */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-1 border-t border-border/40 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3.5 text-muted-foreground text-xs" />
              <input
                name="mobile-search"
                className="w-full h-10 pl-9 pr-4 rounded-xl text-sm bg-muted/70 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                placeholder="Search clubs, players, leagues..."
                type="text"
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ---------- MOBILE SLIDE-DOWN DRAWER ---------- */}
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-6 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold shadow-sm"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}

              {/* Mobile Auth CTAs */}
              <div className="pt-4 mt-2 border-t border-border/60 flex flex-col gap-2.5">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-border bg-card text-foreground"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShowLogin(true);
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground shadow-md shadow-primary/20"
                >
                  Sign In / Register
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLogin && (
        <Suspense fallback={null}>
          <LoginForm onclose={() => setShowLogin(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;
