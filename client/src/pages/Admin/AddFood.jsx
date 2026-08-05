import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function AddFood() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    images: "",
    isVeg: false,
    isHealthy: false,
    spiceLevel: "none",
    preparationTime: 20,
    ingredients: "",
    nutrition: { calories: "", protein: "", carbs: "", fat: "" },
    allergens: "",
  });

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("nutrition.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nutrition: { ...prev.nutrition, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Name, price aur category required hai!");
      return;
    }
    setLoading(true);
    try {
      await API.post("/admin/foods", {
        ...formData,
        images: formData.images ? [formData.images] : [],
        ingredients: formData.ingredients
          ? formData.ingredients.split(",").map((i) => i.trim())
          : [],
        allergens: formData.allergens
          ? formData.allergens.split(",").map((a) => a.trim())
          : [],
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
        nutrition: {
          calories: Number(formData.nutrition.calories) || 0,
          protein: Number(formData.nutrition.protein) || 0,
          carbs: Number(formData.nutrition.carbs) || 0,
          fat: Number(formData.nutrition.fat) || 0,
        },
      });
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all";
  const labelClass = "font-body text-sm text-text-secondary mb-1 block ml-2";

  return (
    <div className="min-h-screen bg-bg-cream pb-10">

      {/* Header */}
      <div className="px-5 pt-8 pb-5"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #FDBA74 60%, #FFFBF7 100%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-white/80 text-sm">Admin</p>
            <h1 className="font-heading text-2xl font-bold text-white">Add New Bite</h1>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="font-body text-sm text-white/80 border border-white/30 rounded-full px-4 py-1.5"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-4">

        <div>
          <label className={labelClass}>Food Name *</label>
          <input name="name" placeholder="e.g. Paneer Tikka" value={formData.name} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" placeholder="Short description..." value={formData.description} onChange={handleChange}
            className="w-full px-5 py-3 rounded-[24px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all resize-none"
            rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Price (₹) *</label>
            <input name="price" type="number" placeholder="199" value={formData.price} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Discount Price (₹)</label>
            <input name="discountPrice" type="number" placeholder="149" value={formData.discountPrice} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary focus:outline-none focus:border-bite-orange transition-all">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input name="images" placeholder="https://..." value={formData.images} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Spice Level</label>
          <select name="spiceLevel" value={formData.spiceLevel} onChange={handleChange}
            className="w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary focus:outline-none focus:border-bite-orange transition-all">
            {["none", "mild", "medium", "hot", "extra-hot"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Prep Time (minutes)</label>
          <input name="preparationTime" type="number" value={formData.preparationTime} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Ingredients (comma separated)</label>
          <input name="ingredients" placeholder="Paneer, Onion, Capsicum..." value={formData.ingredients} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Allergens (comma separated)</label>
          <input name="allergens" placeholder="Dairy, Gluten..." value={formData.allergens} onChange={handleChange} className={inputClass} />
        </div>

        {/* Nutrition */}
        <div>
          <label className={labelClass}>Nutrition Info</label>
          <div className="grid grid-cols-2 gap-3">
            {["calories", "protein", "carbs", "fat"].map((n) => (
              <input key={n} name={`nutrition.${n}`} type="number"
                placeholder={n.charAt(0).toUpperCase() + n.slice(1)}
                value={formData.nutrition[n]} onChange={handleChange}
                className={inputClass} />
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-4">
          {[
            { name: "isVeg", label: "🥦 Veg" },
            { name: "isHealthy", label: "💚 Healthy" },
          ].map((toggle) => (
            <label key={toggle.name}
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-[18px] cursor-pointer flex-1 justify-center"
              style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
              <input type="checkbox" name={toggle.name}
                checked={formData[toggle.name]} onChange={handleChange}
                className="accent-bite-orange w-4 h-4" />
              <span className="font-body text-sm text-text-primary">{toggle.label}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-[18px] bg-bite-orange text-white font-heading font-semibold text-base hover:scale-[1.03] hover:shadow-lg transition-all duration-200 disabled:opacity-60 mt-2"
        >
          {loading ? "Adding..." : "Add This Bite 🍊"}
        </button>
      </div>
    </div>
  );
}