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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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
    href: "https://youtube.com",
    hover: "hover:text-destructive hover:border-destructive/40",
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    href: "https://instagram.com",
    hover: "hover:text-primary hover:border-primary/40",
  },
  {
    icon: FaFacebook,
    name: "Facebook",
    href: "https://facebook.com",
    hover: "hover:text-info hover:border-info/40",
  },
  {
    icon: FaXTwitter,
    name: "X",
    href: "https://x.com",
    hover: "hover:text-foreground hover:border-foreground/40",
  },
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    href: "https://linkedin.com",
    hover: "hover:text-info hover:border-info/40",
  },
  {
    icon: FaSquareGithub,
    name: "GitHub",
    href: "https://github.com",
    hover: "hover:text-primary hover:border-primary/40",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-card border-t border-border text-foreground">
      {/* ---------- TOP SECTION: STATS STRIP ---------- */}
      <div className="border-b border-border bg-surface-elevated/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {statHighlights.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors"
                >
                  <div className="p-2 rounded-md bg-surface-elevated border border-border text-primary flex items-center justify-center shrink-0">
                    <Icon className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
                      {stat.value}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand Info (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">⚽</span>
              <span className="font-extrabold text-lg tracking-tight text-foreground font-sans">
                FOOTBALL<span className="text-primary font-black">COLLECT</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your football destination for verified club histories,
              trophy cabinets, player career journeys, and tactical stats.
            </p>
            <Badge variant="secondary" size="default" className="w-fit">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>2026/27 European Football Archive</span>
            </Badge>
          </div>

          {/* Nav Columns (Span 4) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                Explore
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {[
                  { name: "Home", path: "/" },
                  { name: "Teams", path: "/teams" },
                  { name: "Players", path: "/players" },
                  { name: "Leagues", path: "/leagues" },
                  { name: "News", path: "/news" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="hover:text-primary transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                Archive
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {[
                  { name: "Top Clubs", path: "/teams" },
                  { name: "Legends", path: "/players" },
                  { name: "Honors", path: "/teams" },
                  { name: "Transfers", path: "/news" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="hover:text-primary transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                About
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {[
                  { name: "About Us", path: "/aboutus" },
                  { name: "Contact", path: "/contactus" },
                  { name: "Profile", path: "/profile" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="hover:text-primary transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Box (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <h4 className="text-sm font-bold text-foreground tracking-tight">
              Football Gazette Newsletter
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Receive updates on matchday fixtures, trophy milestones, and newly documented player careers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 mt-1"
            >
              <Input
                size="sm"
                type="email"
                placeholder="Enter email address"
                required
              />
              <Button
                type="submit"
                variant="default"
                size="sm"
                aria-label="Subscribe"
              >
                <FaLocationArrow className="size-3" />
              </Button>
            </form>
            <span className="text-[10px] text-muted-foreground">
              Direct inbox delivery. Unsubscribe anytime.
            </span>
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM BAR: SOCIALS & COPYRIGHT ---------- */}
      <div className="border-t border-border bg-surface-elevated/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">Football Collect</span>.
            All rights reserved. Dedicated to European and global football archives.
          </p>

          {/* Social Media Pills */}
          <div className="flex items-center gap-1.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`p-1.5 rounded-md border border-border bg-card text-muted-foreground transition-colors ${social.hover}`}
                >
                  <Icon className="size-3.5" />
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
