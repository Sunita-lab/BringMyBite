import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function AddCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", emoji: "🍽️" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      alert("Category name required!");
      return;
    }
    setLoading(true);
    try {
      await API.post("/admin/categories", formData);
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream">
      <div className="px-5 pt-8 pb-5"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #FDBA74 60%, #FFFBF7 100%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-white/80 text-sm">Admin</p>
            <h1 className="font-heading text-2xl font-bold text-white">Add Category</h1>
          </div>
          <button onClick={() => navigate("/admin")}
            className="font-body text-sm text-white/80 border border-white/30 rounded-full px-4 py-1.5">
            ← Back
          </button>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-4">
        <div>
          <label className="font-body text-sm text-text-secondary mb-1 block ml-2">
            Category Name *
          </label>
          <input name="name" placeholder="e.g. Pizza" value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all" />
        </div>

        <div>
          <label className="font-body text-sm text-text-secondary mb-1 block ml-2">
            Emoji
          </label>
          <input name="emoji" placeholder="🍕" value={formData.emoji}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary focus:outline-none focus:border-bite-orange transition-all" />
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-4 rounded-[18px] bg-bite-orange text-white font-heading font-semibold text-base hover:scale-[1.03] hover:shadow-lg transition-all duration-200 disabled:opacity-60 mt-2">
          {loading ? "Adding..." : "Add Category 📂"}
        </button>
      </div>
    </div>
  );
}