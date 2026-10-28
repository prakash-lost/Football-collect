import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  Globe2,
  CheckCircle,
  ChevronDown,
  Shield,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Editorial & News Desk",
    desc: "For matchday scoops, press releases, and breaking transfer stories.",
    contact: "press@footballhub.com",
  },
  {
    icon: Shield,
    title: "Club Database & Stats",
    desc: "Submit a trophy cabinet correction or update stadium capacities.",
    contact: "data@footballhub.com",
  },
  {
    icon: Globe2,
    title: "Commercial & Partnerships",
    desc: "Sponsorships, advertising partnerships, and API access.",
    contact: "partnerships@footballhub.com",
  },
];

const faqs = [
  {
    q: "How frequently are player ratings and statistics updated?",
    a: "Our player performance ratings and season stats are synced after every matchday across Europe's top 5 domestic leagues and UEFA Champions League fixtures.",
  },
  {
    q: "Can I suggest a club or wonderkid to be added to the database?",
    a: "Absolutely! Submit your suggestions using the contact form below with the subject 'Club Data Correction' or 'Suggest a Player Star'.",
  },
  {
    q: "Where do official trophy records and stadium capacities originate?",
    a: "All trophies, league titles, and stadium capacities are cross-verified with official UEFA registries, league association archives, and club documentation.",
  },
  {
    q: "Is FootballHub free to browse and use for fans?",
    a: "Yes! FootballHub is 100% free for all football fans worldwide, supported by passionate supporters and football enthusiasts.",
  },
];

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "data",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "data", message: "" });
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
      {/* ---------- 1. HEADER ---------- */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>FootballHub Support & Fan Desk</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Get in Touch With Us
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Have a suggestion, spotted a data error, or want to partner with Europe's fastest-growing
          football directory? Our team is here to help.
        </p>
      </div>

      {/* ---------- 2. CONTACT CHANNELS STRIP ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {contactMethods.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md flex flex-col justify-between hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-foreground">
                  {channel.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {channel.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60">
                <a
                  href={`mailto:${channel.contact}`}
                  className="text-xs font-black text-primary hover:underline"
                >
                  {channel.contact}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- 3. FORM & FAQ GRID ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (Span 7) */}
        <div className="lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl">
          <h2 className="text-2xl font-black text-foreground tracking-tight mb-1">
            Send a Message to the Desk 📬
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            Fill in the details below and a FootballHub team member will respond within 24 hours.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3 animate-in fade-in">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <h3 className="text-xl font-black text-foreground">
                Message Transmitted Successfully!
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                Thank you for contributing to FootballHub. Our editorial team will review your inquiry shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alex Rossi"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Topic Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                >
                  <option value="data">Club Trophy / Stadium Data Correction</option>
                  <option value="player">Suggest a Star Player Profile</option>
                  <option value="partnership">Sponsorship / Commercial Inquiry</option>
                  <option value="bug">Bug Report / Technical Feedback</option>
                  <option value="general">General Football Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you have in mind..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* FAQs Accordion (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-black text-foreground tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quick answers to common questions about FootballHub data.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
