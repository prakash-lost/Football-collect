import React, { lazy, Suspense, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Search, Menu, X, Sun, Moon, User, ArrowRight } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ThemeContext } from "../context/ThemeContext";

const LoginForm = lazy(() => import("../pages/LoginForm"));

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Fixtures", path: "/fixtures" },
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
  const { isDark, setIsDark } = useContext(ThemeContext);
  const location = useLocation?.() || { pathname: "/" };
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/teams?search=${encodeURIComponent(searchText.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* ---------- BRAND LOGO ---------- */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-lg p-1 shrink-0"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-surface-elevated border border-border group-hover:border-primary transition-colors shrink-0">
                <img
                  className="h-5 w-5 sm:h-7 sm:w-7 object-contain"
                  src="/footballlogo.png"
                  alt="Football Collect"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span className="hidden text-base">⚽</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-foreground flex items-center gap-1 font-sans">
                  FOOTBALL<span className="text-primary font-black">COLLECT</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hidden sm:block -mt-1">
                  Clubs & Legends
                </span>
              </div>
            </Link>

            {/* ---------- DESKTOP NAVIGATION LINKS ---------- */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-colors outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                      isActive
                        ? "text-primary bg-surface-elevated font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ---------- RIGHT ACTIONS: SEARCH + THEME + AUTH ---------- */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Desktop Search Form */}
              <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center w-48 xl:w-56">
                <Input
                  size="sm"
                  leftIcon={Search}
                  placeholder="Search clubs or stars..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </form>

              {/* Mobile Search Toggle Button */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Toggle search"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
              >
                <Search className="size-4" />
              </Button>

              {/* Theme Toggle Pill */}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-card border border-border">
                {isDark ? (
                  <Moon className="size-3.5 text-primary" />
                ) : (
                  <Sun className="size-3.5 text-warning" />
                )}
                <Switch
                  checked={isDark}
                  onCheckedChange={setIsDark}
                  aria-label="Toggle dark mode"
                  className="scale-90"
                />
              </div>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md text-foreground hover:text-primary hover:bg-surface-elevated border border-border transition-colors outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <User className="size-3.5" />
                  <span>Profile</span>
                </Link>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => setShowLogin(true)}
                >
                  Sign In
                </Button>
              </div>

              {/* Mobile Menu Hamburger Button */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* ---------- MOBILE EXPANDABLE SEARCH ---------- */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3 pt-2 border-t border-border bg-card animate-in slide-in-from-top-1 duration-150">
            <form onSubmit={handleSearchSubmit}>
              <Input
                size="sm"
                leftIcon={Search}
                autoFocus
                placeholder="Search clubs, players, leagues..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* ---------- MOBILE SLIDE-DOWN DRAWER ---------- */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-semibold transition-colors outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                      isActive
                        ? "bg-surface-elevated text-primary font-bold"
                        : "text-foreground hover:bg-surface-elevated/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="size-4 opacity-40" />
                  </Link>
                );
              })}

              {/* Mobile Auth CTAs */}
              <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-md text-xs font-semibold border border-border bg-background text-foreground"
                >
                  <User className="size-3.5" />
                  <span>My Profile</span>
                </Link>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => {
                    setMenuOpen(false);
                    setShowLogin(true);
                  }}
                  className="w-full"
                >
                  Sign In / Register
                </Button>
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
