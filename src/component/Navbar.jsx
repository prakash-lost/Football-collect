//

import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import LoginForm from "../pages/LoginForm";
import { Switch } from "../components/ui/switch";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X } from "lucide-react";

// CHANGE 1: The links were written twice (desktop + mobile menu).
// Now they live in ONE array. To add/remove a page, edit only this list.
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Players", path: "/players" },
  { label: "Leagues", path: "/leagues" },
  { label: "Teams", path: "/teams" },
  { label: "News", path: "/news" },
  // { label: "About us", path: "/aboutus" },     // re-enable by uncommenting
  // { label: "Contact us", path: "/contactus" }, // re-enable by uncommenting
];

// CHANGE 2: This long class string was copy-pasted 4 times (Profile + Login,
// on mobile and desktop). Now it is written once and reused.
// "hover:cursor-pointer" became "cursor-pointer" (same result, shorter).
const buttonStyle =
  "bg-slate-700 hover:bg-slate-500 text-white px-2 py-1 sm:p-2 text-xs sm:text-sm rounded-md cursor-pointer";

// CHANGE 3: Small reusable component for the links.
// It is used twice: desktop bar and mobile dropdown. Only the className differs.
// onLinkClick is optional - the mobile menu uses it to close itself.
const NavLinks = ({ className, onLinkClick }) => (
  <div className={className}>
    {navLinks.map((link) => (
      <Link key={link.path} to={link.path} onClick={onLinkClick}>
        {link.label}
      </Link>
    ))}
  </div>
);

// CHANGE 4: Small reusable component for Profile + Login buttons.
// Used twice: mobile top row and desktop right side.
const AuthButtons = ({ className, onLoginClick }) => (
  <div className={`items-center gap-3 ${className}`}>
    {/* CHANGE 5: A <button> inside a <Link> is invalid HTML (two clickable
        elements nested). Now the Link itself carries the button style. */}
    <Link to="/profile" className={buttonStyle}>
      Profile
    </Link>
    <button onClick={onLoginClick} className={buttonStyle}>
      Login
    </button>
  </div>
);

const Navbar = () => {
  // CHANGE 6: Clearer state names.
  // clicked -> showLogin, hamburger -> menuOpen
  const [showLogin, setShowLogin] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // CHANGE 7: One shared value for both search inputs (mobile + desktop).
  // Before, each input kept its own text, so resizing the screen lost it.
  const [searchText, setSearchText] = useState("");
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <div className="sticky top-0 z-50">
      {/* CHANGE 8: Removed extra spaces inside className strings. */}
      <div className="px-3 sm:px-8 min-h-16 py-2 flex flex-col sm:flex-row justify-between items-center font-bold bg-blue-950 text-slate-100">
        {/* ---------- LEFT BLOCK: logo, (mobile buttons), icons ---------- */}
        {/* CHANGE 9: Added items-center here, so the old "mb-3 sm:mt-3"
            margin tricks on the button wrappers are no longer needed. */}
        <div className="flex w-full sm:w-auto justify-between items-center">
          {/* CHANGE 10: Removed the extra overflow-hidden wrapper div and
              "aspect-video" (it did nothing because height + width were fixed). */}
          <Link to="/" className="block">
            <img
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain invert"
              // CHANGE 11: "/footballlogo.png" instead of "./footballlogo.png".
              // A "./" path breaks on nested pages like /players/10.
              src="/footballlogo.png"
              // CHANGE 12: alt text added (screen readers + broken image case).
              alt="Football logo"
            />
          </Link>

          {/* Mobile-only Profile/Login (same idea as before) */}
          <AuthButtons
            className="flex sm:hidden"
            onLoginClick={() => setShowLogin(true)}
          />

          {/* CHANGE 13: gap-2 spaces the icons, so no "pr-2" on the icon. */}
          <div className="flex items-center gap-2">
            <button
              className="sm:hidden text-white"
              // CHANGE 14: aria-label, because an icon-only button has no text.
              aria-label="Toggle search"
              // CHANGE 15: (prev) => !prev is the safe way to flip a boolean.
              onClick={() => setMobileSearchOpen((prev) => !prev)}
            >
              <FaSearch className="text-2xl" />
            </button>

            {/* CHANGE 16: This is now the ONLY theme Switch. Your old code had
                a second Switch inside a "hidden" div that never showed. */}
            <Switch
              checked={isDark}
              onCheckedChange={setIsDark}
              aria-label="Toggle dark mode"
            />

            <button
              className="sm:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ---------- CENTER: desktop links ---------- */}
        {/* CHANGE 17: Uses <NavLinks /> instead of repeating every <Link>.
            Removed flex-wrap and md:gap-3 (they had no real effect here). */}
        <NavLinks className="hidden sm:flex gap-4 items-center text-lg font-serif" />

        {/* ---------- RIGHT BLOCK: desktop search + buttons ---------- */}
        {/* CHANGE 18: The whole block is hidden on mobile. Before, an empty
            wrapper div stayed on mobile and only its children were hidden. */}
        <div className="hidden sm:flex sm:mr-8 gap-4 items-center">
          <div className="bg-white flex items-center rounded-full focus-within:ring-2">
            <input
              name="search"
              // CHANGE 19: w-28 instead of w-18 (w-18 is not a standard class
              // in older Tailwind versions, w-28 works everywhere).
              className="focus:outline-none w-28 h-7 pl-4 pr-3 text-sm text-black"
              placeholder="Search"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <AuthButtons
            className="flex"
            onLoginClick={() => setShowLogin(true)}
          />
        </div>
      </div>

      {showLogin && <LoginForm onclose={() => setShowLogin(false)} />}

      {mobileSearchOpen && (
        <div className="sm:hidden w-full px-3 pb-2 bg-blue-950">
          <input
            name="mobile-search"
            className="focus:outline-none w-full h-8 pl-4 rounded-full text-sm text-white border-white border-2"
            placeholder="Search"
            type="text"
            autoFocus
            // Same shared state as the desktop input (see CHANGE 7).
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}

      {menuOpen && (
        // CHANGE 20: Clicking a link now closes the mobile menu.
        // Before, the menu stayed open after you navigated.
        // Added py-2 so the links are not squeezed against the edges.
        <NavLinks
          className="bg-blue-950 text-white sm:hidden flex justify-center flex-wrap gap-4 items-center py-2 text-base font-serif"
          onLinkClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
