import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/register", formData);
      login(data);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #FDBA74 0%, transparent 45%), radial-gradient(circle at 80% 80%, #FB923C 0%, transparent 45%), #F9F2E8",
      }}
    >
      {/* Decorative blur shapes */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "#F97316", top: "-60px", left: "-60px" }}
      />
      <div
        className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#65A30D", bottom: "-60px", right: "-60px" }}
      />

      {/* Glass Card */}
      <div
        className="relative w-full max-w-md rounded-[24px] p-8"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 20px 50px rgba(249,115,22,0.12)",
        }}
      >
        {/* Mascot */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🍊</div>
          <h1 className="font-heading text-2xl font-bold text-text-primary">
            Join BringMyBite!
          </h1>
          <p className="font-body text-text-secondary text-sm mt-1">
            Your next favorite bite is waiting.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-tomato text-sm rounded-2xl px-4 py-3 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold text-base transition-all duration-200 hover:scale-[1.03] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating your account..." : "Grab Your Bite 🍊"}
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center font-body text-text-secondary text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-bite-orange font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}