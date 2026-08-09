import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Bite Logo — orange circle with a bite taken out
function BiteLogo({ size = 36 }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "#F97316" }}
      />
      <div
        className="absolute rounded-full"
        style={{
          background: "#F9F2E8",
          width: size * 0.42,
          height: size * 0.42,
          top: size * 0.08,
          right: size * -0.08,
        }}
      />
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const popularChips = ["Pizza", "Burgers", "Healthy", "Biryani", "Desserts"];
  const navLinks = ["Our Story", "BiteMatch AI", "Bite Partners", "BiteCoins", "Offers"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #FFF8EF 0%, #F9F2E8 55%, #F2E4D3 100%)",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <BiteLogo size={34} />
          <span className="font-heading text-xl font-bold text-text-primary">
            BringMy<span className="text-bite-orange">Bite</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-sm text-text-primary hover:text-bite-orange transition-all"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/signup")}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white hover:scale-[1.03] transition-all"
            style={{ background: "#1F2417" }}
          >
            Grab My Bite
            <span>→</span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-border-gray flex items-center justify-center hover:bg-white transition-all"
          >
            <span className="text-text-primary">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden px-6 pb-5 -mt-2">
    <div className="bg-white rounded-[20px] p-5 flex flex-col gap-4" style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.08)" }}>
      {navLinks.map((link) => (
        <a key={link} href="#" className="font-body text-sm text-text-primary">
          {link}
        </a>
      ))}
      <button
        onClick={() => navigate("/signup")}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold text-white"
        style={{ background: "#1F2417" }}
      >
        Grab My Bite <span>→</span>
      </button>
    </div>
  </div>
)}

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>
          <p className="font-body text-sm text-text-secondary mb-3">
            Made for cravings. Built around bites. 🧡
          </p>

          <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-primary leading-[1.1] mb-5">
            You bring
            <br />
            the craving.
            <br />
            <span className="text-bite-orange italic">We bring</span>
            <br />
            <span className="text-bite-orange italic">the bite.</span>
          </h1>

          <p className="font-body text-text-secondary text-base mb-6">
            AI-powered matches. Handpicked bites. Lightning delivery.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mb-4">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-disabled">
              🔍
            </span>
            <input
              type="text"
              placeholder="What are you craving today?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate("/signup")}
              className="w-full pl-12 pr-14 py-4 rounded-[999px] bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-bite-orange/30 transition-all"
              style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}
            />
            <button
              onClick={() => navigate("/signup")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bite-orange text-white flex items-center justify-center hover:scale-110 transition-all"
            >
              →
            </button>
          </div>

          {/* Popular Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-body text-xs text-text-secondary mr-1">
              Popular right now:
            </span>
            {popularChips.map((chip) => (
              <button
                key={chip}
                onClick={() => navigate("/signup")}
                className="font-body text-xs text-text-primary bg-white/70 border border-border-gray rounded-full px-3 py-1.5 hover:border-bite-orange hover:text-bite-orange transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Right — Hero Image */}
        <div className="relative flex items-center justify-center -ml-6 md:-ml-12">
          <img
            src="/hero-bag.png"
            alt="BringMyBite — packed with care, delivered with love"
            className="w-full h-auto scale-125 md:scale-150"
            style={{
              maskImage: "radial-gradient(circle at center, black 55%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 55%, transparent 85%)",
            }}
          />
        </div>
      </div>

      {/* Mood Selector + BiteMatch AI */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 pb-10">
        <div
          className="rounded-[32px] p-6 md:p-10"
          style={{ background: "#FFFBF3" }}
        >
          {/* Mood Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <h2 className="font-heading text-2xl font-bold text-text-primary flex-shrink-0">
              Every mood
              <br />
              deserves a <span className="text-bite-orange italic">bite.</span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "Happy", emoji: "🙂" },
                { label: "Tired", emoji: "😴" },
                { label: "Gym Mode", emoji: "🏋️" },
                { label: "Date Night", emoji: "❤️" },
                { label: "Rainy Day", emoji: "🌧️" },
                { label: "Sick Day", emoji: "🤒" },
              ].map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => navigate("/signup")}
                  className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-[18px] bg-white border border-border-gray hover:border-bite-orange transition-all min-w-[80px]"
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="font-body text-xs text-text-primary">
                    {mood.label}
                  </span>
                </button>
              ))}

              <button
                onClick={() => navigate("/signup")}
                className="flex flex-col items-center justify-center gap-1.5 px-4 py-3 rounded-[18px] text-white hover:scale-[1.03] transition-all min-w-[80px]"
                style={{ background: "#1F2417" }}
              >
                <span className="text-xl">✨</span>
                <span className="font-body text-xs text-center leading-tight">
                  Surprise Me
                  <br />
                  Use BiteMatch AI
                </span>
              </button>
            </div>
          </div>

          {/* BiteMatch AI Dark Card */}
          <div
            className="rounded-[28px] p-6 md:p-8"
            style={{ background: "#1F2417" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-center">

              {/* Left — Chat Preview */}
              <div>
                <p className="font-body text-xs text-honey-gold mb-2">
                  BiteMatch AI ✨
                </p>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">
                  Describe your <span className="text-bite-orange italic">craving.</span>
                </h3>
                <p className="font-heading text-2xl font-bold text-white mb-5">
                  We'll do the rest.
                </p>

                {/* Chat bubbles */}
                <div className="space-y-2 mb-5">
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                    <p className="font-body text-xs text-white/90">
                      I want something spicy, high protein under ₹250
                    </p>
                    <p className="font-body text-[10px] text-white/40 mt-1">
                      12:30 PM
                    </p>
                  </div>
                  <div className="bg-bite-orange/20 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                    <p className="font-body text-xs text-white/90">
                      Done! Here are top matches for you 🔥
                    </p>
                    <p className="font-body text-[10px] text-white/40 mt-1">
                      12:30 PM
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white font-body text-sm font-semibold text-text-primary hover:scale-[1.03] transition-all"
                >
                  Try BiteMatch AI
                  <span>→</span>
                </button>
              </div>

              {/* Right — Match Cards */}
              <div className="flex gap-2.5 md:gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                {[
                  { name: "Spicy Chicken Bowl", price: 199, match: 98, time: "20 mins", tag: "High Protein" },
                  { name: "Paneer Tikka Wrap", price: 179, match: 96, time: "18 mins", tag: "Spicy" },
                  { name: "Schezwan Noodles", price: 149, match: 94, time: "22 mins", tag: "Spicy" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex-shrink-0 w-32 md:w-36 bg-white rounded-[18px] overflow-hidden"
                  >
                    <div className="h-24 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center relative">
                      <span className="text-3xl">🍽️</span>
                      <span className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-0.5 text-[9px] font-body text-text-primary">
                        Match: {item.match}%
                      </span>
                    </div>
                    <div className="p-2.5">
                      <p className="font-heading text-xs font-bold text-text-primary truncate">
                        {item.name}
                      </p>
                      <p className="font-body text-[10px] text-text-secondary mt-0.5">
                        {item.time} • {item.tag}
                      </p>
                      <p className="font-price text-xs font-bold text-bite-orange mt-1">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-3">
        <div
          className="rounded-[28px] px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ background: "#FFFBF3" }}
        >
          {[
            { emoji: "😋", value: "10M+", label: "Perfect Bites" },
            { emoji: "🏪", value: "5000+", label: "Bite Partners" },
            { emoji: "🎯", value: "98%", label: "Cravings Matched" },
            { emoji: "❤️", value: "4.9★", label: "Love from Bite Lovers" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl">{stat.emoji}</span>
              <div>
                <p className="font-heading text-xl font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-text-secondary leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Every Bite Matters */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div
          className="rounded-[28px] p-6 md:p-10"
          style={{ background: "#FFFBF3" }}
        >
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-6 text-center">
            Why every bite
            <br />
            <span className="text-bite-orange italic">matters.</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: "🎯", title: "Handpicked Bites", desc: "Only the best make the cut." },
              { icon: "⚡", title: "Lightning Delivery", desc: "Fast, hot and right on time." },
              { icon: "✨", title: "Matched By AI", desc: "Smart matches you'll love." },
              { icon: "👨‍🍳", title: "Freshly Prepared", desc: "Made with real ingredients." },
              { icon: "🤗", title: "Loved by Real People", desc: "Because you matter." },
            ].map((item) => (
              <div key={item.title}>
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="font-heading text-sm font-bold text-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chef Spotlight */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div
          className="rounded-[28px] p-6 md:p-10 grid md:grid-cols-[1fr_1.3fr_1fr] gap-8 items-center"
          style={{ background: "#FFFBF3" }}
        >
          {/* Left Text */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
              Behind every bite
              <br />
              is someone who <span className="text-bite-orange italic">cares.</span>
            </h2>
            <p className="font-body text-sm text-text-secondary mb-5">
              From passionate chefs to home kitchens, real people craft every
              bite with love.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-body text-sm font-semibold hover:scale-[1.03] transition-all"
              style={{ background: "#1F2417" }}
            >
              Meet Our Chefs
              <span>→</span>
            </button>
          </div>

          {/* Middle — Chef Card */}
          <div className="relative">
            {/* TODO: replace with <img src="/chef-photo.jpg" className="w-full h-56 object-cover rounded-[24px]" /> */}
            <div className="w-full h-56 rounded-[24px] bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center overflow-hidden">
              <span className="text-6xl">👨‍🍳</span>
            </div>
            <div
              className="absolute -bottom-4 -right-3 bg-white rounded-[18px] p-3 max-w-[180px]"
              style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
            >
              <p className="font-body text-xs text-text-primary italic mb-1">
                "Every bowl I make is someone's favorite bite."
              </p>
              <p className="font-heading text-xs font-bold text-bite-orange">
                Chef Arjun
              </p>
              <p className="font-body text-[10px] text-text-secondary">
                Cooking since 2011
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="space-y-4 pt-4 md:pt-0">
            {[
              { icon: "👨‍🍳", value: "5000+", label: "Chefs & Home Kitchens" },
              { icon: "📍", value: "50+", label: "Cities" },
              { icon: "❤️", value: "∞", label: "Love & Care" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-xl">{stat.icon}</span>
                <div>
                  <p className="font-heading text-base font-bold text-text-primary">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 pb-6 border-t border-border-gray/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-6">

            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-1.5">
                <BiteLogo size={22} />
                <span className="font-heading text-sm font-bold text-text-primary">
                  BringMy<span className="text-bite-orange">Bite</span>
                </span>
              </div>
              <p className="font-body text-[11px] text-text-secondary mb-2">
                Made for cravings.
                <br />
                Built around bites.
              </p>
              <div className="flex gap-2.5">
                {["📷", "📘", "🐦", "▶️"].map((icon, i) => (
                  <span key={i} className="text-xs opacity-60">{icon}</span>
                ))}
              </div>
            </div>

            {[
              { title: "Company", links: ["Our Story", "Careers", "Blog", "Press", "Contact Us"] },
              { title: "For Bite Lovers", links: ["Search", "BiteMatch AI", "Offers", "Track Order", "Help Center"] },
              { title: "For Partners", links: ["Partner With Us", "Bite Partner Login", "Delivery Partner"] },
              { title: "Legal", links: ["Privacy Policy", "Terms & Conditions", "Refund Policy"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-heading text-xs font-bold text-text-primary mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="font-body text-[11px] text-text-secondary hover:text-bite-orange transition-all">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border-gray/50">
            <p className="font-body text-[10px] text-text-secondary">
              © 2026 BringMyBite. All rights reserved.
            </p>
            <BiteLogo size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}