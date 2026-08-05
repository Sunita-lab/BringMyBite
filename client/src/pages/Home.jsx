import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

// Time ke hisaab se greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export default function Home() {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [healthy, setHealthy] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, trendRes, healthRes] = await Promise.all([
          API.get("/categories"),
          API.get("/foods/trending"),
          API.get("/foods/healthy"),
        ]);
        setCategories(catRes.data);
        setTrending(trendRes.data);
        setHealthy(healthRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🍊</div>
          <p className="font-body text-text-secondary">Finding your bites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream pb-10">

      {/* Header */}
      <div className="px-5 pt-8 pb-6"
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #FDBA74 60%, #FFFBF7 100%)"
        }}>

        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-body text-white/80 text-sm">
              {getGreeting()} 👋
            </p>
            <h1 className="font-heading text-2xl font-bold text-white">
              {user?.name?.split(" ")[0]}
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-white/80 font-body text-sm border border-white/30 rounded-full px-4 py-1.5 hover:bg-white/20 transition-all"
          >
            Logout
          </button>
        </div>

        <p className="font-body text-white/90 text-sm mb-4">
          What are you craving today?
        </p>

        {/* Search Bar */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search your next bite..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-5 py-3.5 rounded-[999px] bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-bite-orange/30 transition-all"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}
          />
        </div>
      </div>

      <div className="px-5">

        {/* Categories */}
        <div className="mt-6 mb-6">
          <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
            Categories
          </h2>
          {categories.length === 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {["🍕 Pizza", "🍔 Burger", "🥗 Healthy", "🥟 Momos", "🍜 Ramen", "🍰 Dessert"].map((cat) => (
                <button
                  key={cat}
                  className="flex-shrink-0 px-4 py-2 rounded-[999px] bg-white border border-border-gray font-body text-sm text-text-primary hover:border-bite-orange hover:text-bite-orange transition-all"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  className="flex-shrink-0 px-4 py-2 rounded-[999px] bg-white border border-border-gray font-body text-sm text-text-primary hover:border-bite-orange hover:text-bite-orange transition-all"
                  style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Trending Bites */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-lg font-bold text-text-primary">
              Trending Bites 🔥
            </h2>
            <button className="font-body text-bite-orange text-sm font-semibold">
              See all
            </button>
          </div>

          {trending.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-2">🍕</div>
              <p className="font-body text-text-secondary text-sm">
                No bites yet. Let's add some!
              </p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trending.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </div>

        {/* Healthy Picks */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-lg font-bold text-text-primary">
              Healthy Picks 💚
            </h2>
            <button className="font-body text-fresh-green text-sm font-semibold">
              See all
            </button>
          </div>

          {healthy.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-2">🥗</div>
              <p className="font-body text-text-secondary text-sm">
                No healthy bites yet!
              </p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {healthy.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Food Card Component
function FoodCard({ food }) {
  return (
    <div
      className="flex-shrink-0 w-48 rounded-[24px] bg-white overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-200"
      style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
    >
      {/* Image */}
      <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
        {food.images?.[0] ? (
          <img src={food.images[0]} alt={food.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">🍽️</span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Badges */}
        <div className="flex gap-1 mb-1">
          {food.isVeg && (
            <span className="text-[10px] font-body text-fresh-green border border-fresh-green rounded-full px-2 py-0.5">
              Veg
            </span>
          )}
          {food.isHealthy && (
            <span className="text-[10px] font-body text-fresh-green bg-green-50 rounded-full px-2 py-0.5">
              Healthy 💚
            </span>
          )}
        </div>

        <h3 className="font-heading text-sm font-semibold text-text-primary truncate">
          {food.name}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <span className="text-honey-gold text-xs">⭐</span>
          <span className="font-body text-xs text-text-secondary">
            {food.rating > 0 ? food.rating : "New"}
          </span>
          <span className="text-text-disabled text-xs mx-1">•</span>
          <span className="font-body text-xs text-text-secondary">
            {food.preparationTime} min
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-price font-bold text-text-primary text-sm">
            ₹{food.discountPrice || food.price}
          </span>
          <button className="w-7 h-7 rounded-full bg-bite-orange text-white font-bold text-lg flex items-center justify-center hover:scale-110 transition-all">
            +
          </button>
        </div>
      </div>
    </div>
  );
}