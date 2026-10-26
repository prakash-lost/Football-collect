import React from "react";
import { Link } from "react-router";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa";
import { FaXTwitter, FaSquareGithub } from "react-icons/fa6";
import { IoShieldOutline, IoTrophySharp, IoEarth } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

const statHighlights = [
  {
    icon: IoShieldOutline,
    value: "50+ Teams",
    desc: "Top European & Global Clubs",
  },
  {
    icon: MdGroups,
    value: "500+ Players",
    desc: "Full Roster Profiles & Stats",
  },
  {
    icon: IoTrophySharp,
    value: "12+ Leagues",
    desc: "Premier League, La Liga, UCL",
  },
  { icon: IoEarth, value: "80+ Nations", desc: "Worldwide Football Coverage" },
];

const socialLinks = [
  {
    icon: AiOutlineYoutube,
    name: "YouTube",
    href: "#",
    hover: "hover:text-red-500 hover:border-red-500/40",
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    href: "#",
    hover: "hover:text-pink-500 hover:border-pink-500/40",
  },
  {
    icon: FaFacebook,
    name: "Facebook",
    href: "#",
    hover: "hover:text-blue-500 hover:border-blue-500/40",
  },
  {
    icon: FaXTwitter,
    name: "X",
    href: "#",
    hover: "hover:text-foreground hover:border-foreground/40",
  },
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    href: "#",
    hover: "hover:text-sky-500 hover:border-sky-500/40",
  },
  {
    icon: FaSquareGithub,
    name: "GitHub",
    href: "#",
    hover: "hover:text-primary hover:border-primary/40",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-card/60 border-t border-border/80 backdrop-blur-md text-foreground">
      {/* ---------- TOP SECTION: STATS STRIP ---------- */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {statHighlights.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl border border-border/60 bg-background/50 hover:border-primary/40 transition-colors shadow-sm"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-foreground tracking-tight">
                      {stat.value}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- MAIN FOOTER CONTENT ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="text-2xl">⚽</span>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                FOOTBALL<span className="text-primary">HUB</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your ultimate football destination for detailed team histories,
              player cards, comprehensive league standings, and tactical stats.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live 2026 Season Coverage
            </div>
          </div>

          {/* Nav Columns (Span 5) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Home", "Players", "Teams", "Competitions"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="hover:text-primary transition-colors block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                Database
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {[
                  "Top Clubs",
                  "Squad Rosters",
                  "Trophy Cabinets",
                  "Rankings",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="/teams"
                      className="hover:text-primary transition-colors block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["About Us", "Contact", "Privacy Policy", "Terms of Use"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/aboutus"
                        className="hover:text-primary transition-colors block"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Newsletter Box (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-base font-bold text-foreground tracking-tight">
              Stay in the Game 📬
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to get match updates, team transfers, and newly added
              collectors' cards.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 mt-2"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-10 px-3.5 text-xs sm:text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center hover:opacity-90 transition-all shadow-md shadow-primary/20 shrink-0 cursor-pointer"
              >
                <FaLocationArrow className="w-3.5 h-3.5" />
              </button>
            </form>
            <span className="text-[11px] text-muted-foreground">
              No spam. Unsubscribe anytime.
            </span>
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM BAR: SOCIALS & COPYRIGHT ---------- */}
      <div className="border-t border-border/60 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">Football Hub</span>.
            All rights reserved. Made for football fans worldwide.
          </p>

          {/* Social Media Pills */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className={`p-2 rounded-lg border border-border/80 bg-background/60 text-muted-foreground transition-all duration-200 ${social.hover} hover:-translate-y-0.5 hover:shadow-sm`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
