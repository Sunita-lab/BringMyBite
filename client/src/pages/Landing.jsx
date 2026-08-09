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

  return (
    <div
      className="min-h-screen"
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
            onClick={() => navigate("/login")}
            className="md:hidden w-10 h-10 rounded-full border border-border-gray flex items-center justify-center hover:bg-white transition-all"
          >
            <span className="text-text-primary">☰</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 grid md:grid-cols-2 gap-10 items-center">

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
<div className="relative flex items-center justify-center -ml-8 md:-ml-14">
  <img
    src="/hero-bag.png"
    alt="BringMyBite — packed with care, delivered with love"
    className="w-full h-auto scale-125 md:scale-130"
    style={{
      maskImage: "radial-gradient(circle at center, black 55%, transparent 85%)",
      WebkitMaskImage: "radial-gradient(circle at center, black 55%, transparent 85%)",
    }}
  />
</div>
      </div>
    </div>
  );
}