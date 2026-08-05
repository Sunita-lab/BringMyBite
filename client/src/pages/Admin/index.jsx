import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("foods");
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/home");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [foodRes, catRes] = await Promise.all([
        API.get("/foods"),
        API.get("/categories"),
      ]);
      setFoods(foodRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    if (!window.confirm("Delete this bite?")) return;
    await API.delete(`/admin/foods/${id}`);
    setFoods(foods.filter((f) => f._id !== id));
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await API.delete(`/admin/categories/${id}`);
    setCategories(categories.filter((c) => c._id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="text-5xl animate-bounce">🍊</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream">

      {/* Header */}
      <div className="px-5 pt-8 pb-5"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #FDBA74 60%, #FFFBF7 100%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-white/80 text-sm">Admin Panel</p>
            <h1 className="font-heading text-2xl font-bold text-white">
              BringMyBite 🍊
            </h1>
          </div>
          <button
            onClick={() => navigate("/home")}
            className="font-body text-sm text-white/80 border border-white/30 rounded-full px-4 py-1.5 hover:bg-white/20 transition-all"
          >
            ← Home
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mt-5">
          {["foods", "categories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-body text-sm font-semibold transition-all capitalize ${
                activeTab === tab
                  ? "bg-white text-bite-orange"
                  : "bg-white/20 text-white"
              }`}
            >
              {tab === "foods" ? "🍽️ Foods" : "📂 Categories"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">

        {/* Foods Tab */}
        {activeTab === "foods" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold text-text-primary">
                All Bites ({foods.length})
              </h2>
              <button
                onClick={() => navigate("/admin/add-food")}
                className="px-4 py-2 rounded-[18px] bg-bite-orange text-white font-heading text-sm font-semibold hover:scale-[1.03] transition-all"
              >
                + Add Bite
              </button>
            </div>

            {foods.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">🍽️</div>
                <p className="font-heading text-lg font-bold text-text-primary mb-1">
                  No bites yet
                </p>
                <p className="font-body text-text-secondary text-sm">
                  Add your first food item!
                </p>
              </div>
            ) : (
              <div className="space-y-3 pb-10">
                {foods.map((food) => (
                  <div key={food._id}
                    className="bg-white rounded-[24px] p-4 flex items-center gap-4"
                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>

                    <div className="w-14 h-14 rounded-[16px] bg-orange-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {food.images?.[0] ? (
                        <img src={food.images[0]} alt={food.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">🍽️</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-bold text-text-primary truncate">
                        {food.name}
                      </h3>
                      <p className="font-body text-xs text-text-secondary">
                        {food.category?.emoji} {food.category?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-price font-bold text-bite-orange text-sm">
                          ₹{food.price}
                        </span>
                        {food.isVeg && (
                          <span className="text-[10px] text-fresh-green border border-fresh-green rounded-full px-2 py-0.5">
                            Veg
                          </span>
                        )}
                        {food.isHealthy && (
                          <span className="text-[10px] text-fresh-green bg-green-50 rounded-full px-2 py-0.5">
                            Healthy 💚
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate(`/admin/edit-food/${food._id}`)}
                        className="px-3 py-1.5 rounded-full bg-bg-cream font-body text-xs text-text-primary hover:bg-orange-50 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFood(food._id)}
                        className="px-3 py-1.5 rounded-full bg-red-50 font-body text-xs text-tomato hover:bg-red-100 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold text-text-primary">
                Categories ({categories.length})
              </h2>
              <button
                onClick={() => navigate("/admin/add-category")}
                className="px-4 py-2 rounded-[18px] bg-bite-orange text-white font-heading text-sm font-semibold hover:scale-[1.03] transition-all"
              >
                + Add Category
              </button>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">📂</div>
                <p className="font-heading text-lg font-bold text-text-primary mb-1">
                  No categories yet
                </p>
                <p className="font-body text-text-secondary text-sm">
                  Add your first category!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pb-10">
                {categories.map((cat) => (
                  <div key={cat._id}
                    className="bg-white rounded-[24px] p-4"
                    style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                    <div className="text-3xl mb-2">{cat.emoji}</div>
                    <h3 className="font-heading text-sm font-bold text-text-primary">
                      {cat.name}
                    </h3>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        className="flex-1 py-1.5 rounded-full bg-red-50 font-body text-xs text-tomato hover:bg-red-100 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}