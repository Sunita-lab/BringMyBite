import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await API.get(`/foods/${id}`);
        setFood(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🍊</div>
          <p className="font-body text-text-secondary">Loading your bite...</p>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">😕</div>
          <p className="font-heading text-xl font-bold text-text-primary mb-2">
            Oops. Someone already took this bite.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-6 py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold hover:scale-[1.03] transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream">

      {/* Food Image */}
      <div className="relative w-full h-72 bg-gradient-to-br from-orange-100 to-orange-50">
        {food.images?.[0] ? (
          <img
            src={food.images[0]}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl">🍽️</span>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-text-primary hover:scale-110 transition-all"
          style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
        >
          ←
        </button>

        {/* Badges */}
        <div className="absolute top-5 right-5 flex gap-2">
          {food.isVeg && (
            <span className="text-xs font-body text-fresh-green bg-white border border-fresh-green rounded-full px-3 py-1">
              Veg
            </span>
          )}
          {food.isHealthy && (
            <span className="text-xs font-body text-fresh-green bg-white rounded-full px-3 py-1">
              Healthy 💚
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-6 pb-32">

        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-2">
          <h1 className="font-heading text-2xl font-bold text-text-primary flex-1 mr-4">
            {food.name}
          </h1>
          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1"
            style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.06)" }}>
            <span className="text-honey-gold">⭐</span>
            <span className="font-body text-sm font-semibold text-text-primary">
              {food.rating > 0 ? food.rating : "New"}
            </span>
            {food.reviewCount > 0 && (
              <span className="font-body text-xs text-text-secondary">
                ({food.reviewCount})
              </span>
            )}
          </div>
        </div>

        {/* Category + Prep Time */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-body text-sm text-text-secondary">
            {food.category?.emoji} {food.category?.name}
          </span>
          <span className="text-border-gray">•</span>
          <span className="font-body text-sm text-text-secondary">
            ⏱ {food.preparationTime} min
          </span>
          <span className="text-border-gray">•</span>
          <span className="font-body text-sm text-text-secondary capitalize">
            🌶 {food.spiceLevel}
          </span>
        </div>

        {/* Description */}
        {food.description && (
          <p className="font-body text-text-secondary text-sm leading-relaxed mb-5">
            {food.description}
          </p>
        )}

        {/* Nutrition */}
        {(food.nutrition?.calories > 0) && (
          <div className="bg-white rounded-[24px] p-4 mb-5"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <h3 className="font-heading text-sm font-bold text-text-primary mb-3">
              Nutrition Info
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: "Calories", value: food.nutrition.calories, unit: "kcal" },
                { label: "Protein", value: food.nutrition.protein, unit: "g" },
                { label: "Carbs", value: food.nutrition.carbs, unit: "g" },
                { label: "Fat", value: food.nutrition.fat, unit: "g" },
              ].map((item) => (
                <div key={item.label} className="bg-bg-cream rounded-2xl p-2">
                  <p className="font-price font-bold text-bite-orange text-sm">
                    {item.value}
                  </p>
                  <p className="font-body text-[10px] text-text-secondary">
                    {item.unit}
                  </p>
                  <p className="font-body text-[10px] text-text-disabled">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients */}
        {food.ingredients?.length > 0 && (
          <div className="mb-5">
            <h3 className="font-heading text-sm font-bold text-text-primary mb-2">
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {food.ingredients.map((ing, i) => (
                <span key={i}
                  className="font-body text-xs text-text-secondary bg-white border border-border-gray rounded-full px-3 py-1">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Allergens */}
        {food.allergens?.length > 0 && (
          <div className="mb-5">
            <h3 className="font-heading text-sm font-bold text-tomato mb-2">
              ⚠️ Allergens
            </h3>
            <div className="flex flex-wrap gap-2">
              {food.allergens.map((al, i) => (
                <span key={i}
                  className="font-body text-xs text-tomato bg-red-50 border border-red-100 rounded-full px-3 py-1">
                  {al}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom — Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-5 py-4"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        <div className="flex items-center justify-between">

          {/* Price */}
          <div>
            {food.discountPrice ? (
              <div>
                <span className="font-price font-bold text-2xl text-text-primary">
                  ₹{food.discountPrice}
                </span>
                <span className="font-body text-sm text-text-disabled line-through ml-2">
                  ₹{food.price}
                </span>
              </div>
            ) : (
              <span className="font-price font-bold text-2xl text-text-primary">
                ₹{food.price}
              </span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-bg-cream rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-white text-text-primary font-bold flex items-center justify-center hover:bg-bite-orange hover:text-white transition-all"
              >
                −
              </button>
              <span className="font-heading font-bold text-text-primary w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-6 h-6 rounded-full bg-bite-orange text-white font-bold flex items-center justify-center hover:scale-110 transition-all"
              >
                +
              </button>
            </div>

            <button
              className="px-6 py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold hover:scale-[1.03] hover:shadow-lg transition-all duration-200"
            >
              Add to Bite 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}