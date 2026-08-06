import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    house: "",
    street: "",
    city: "",
    landmark: "",
    pin: "",
  });

  const deliveryFee = 40;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + tax;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!address.house || !address.street || !address.city || !address.pin) {
      setError("Please fill all required address fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const items = cart.map((item) => ({
        food: item.food._id,
        name: item.food.name,
        price: item.food.discountPrice || item.food.price,
        image: item.food.images?.[0] || "",
        quantity: item.quantity,
      }));

      const { data } = await API.post("/orders", {
        items,
        address,
        paymentMethod,
      });

      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-3 rounded-[999px] border border-border-gray bg-white font-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-bite-orange transition-all";

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-6xl mb-4">🍕</div>
          <h1 className="font-heading text-xl font-bold text-text-primary mb-2">
            No bites yet 🍕
          </h1>
          <p className="font-body text-text-secondary text-sm mb-6">
            Let's discover one.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold hover:scale-[1.03] transition-all"
          >
            Browse Bites
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream pb-40">
      {/* Header */}
      <div
        className="px-5 pt-8 pb-5"
        style={{
          background:
            "linear-gradient(135deg, #F97316 0%, #FDBA74 60%, #FFFBF7 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            ←
          </button>
          <h1 className="font-heading text-2xl font-bold text-white">
            Checkout 🍊
          </h1>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-5">
        {/* Error */}
        {error && (
          <div className="bg-red-50 text-tomato text-sm rounded-2xl px-4 py-3 text-center font-body">
            {error}
          </div>
        )}

        {/* Delivery Address */}
        <div>
          <h2 className="font-heading text-sm font-bold text-text-primary mb-3">
            Delivery Address
          </h2>
          <div className="space-y-3">
            <input
              name="house"
              placeholder="House / Flat No. *"
              value={address.house}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="street"
              placeholder="Street / Area *"
              value={address.street}
              onChange={handleChange}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="city"
                placeholder="City *"
                value={address.city}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="pin"
                placeholder="Pincode *"
                value={address.pin}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <input
              name="landmark"
              placeholder="Landmark (optional)"
              value={address.landmark}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="font-heading text-sm font-bold text-text-primary mb-3">
            Payment Method
          </h2>
          <div className="flex gap-3">
            {[
              { value: "cod", label: "💵 Cash on Delivery" },
              { value: "online", label: "💳 Online (Coming Soon)" },
            ].map((method) => (
              <button
                key={method.value}
                disabled={method.value === "online"}
                onClick={() => setPaymentMethod(method.value)}
                className={`flex-1 py-3 rounded-[18px] font-body text-sm transition-all ${
                  paymentMethod === method.value
                    ? "bg-bite-orange text-white"
                    : "bg-white text-text-secondary border border-border-gray"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="font-heading text-sm font-bold text-text-primary mb-3">
            Order Summary
          </h2>
          <div
            className="bg-white rounded-[24px] p-5"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}
          >
            <div className="space-y-2 mb-3">
              {cart.map((item) => (
                <div
                  key={item.food._id}
                  className="flex justify-between font-body text-sm"
                >
                  <span className="text-text-secondary">
                    {item.food.name} × {item.quantity}
                  </span>
                  <span className="text-text-primary">
                    ₹{(item.food.discountPrice || item.food.price) * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border-gray pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="font-body text-sm text-text-secondary">
                  Subtotal
                </span>
                <span className="font-body text-sm text-text-primary">
                  ₹{cartTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-text-secondary">
                  Delivery Fee
                </span>
                <span className="font-body text-sm text-text-primary">
                  ₹{deliveryFee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-text-secondary">
                  Tax
                </span>
                <span className="font-body text-sm text-text-primary">
                  ₹{tax}
                </span>
              </div>
              <div className="border-t border-border-gray pt-2 flex justify-between">
                <span className="font-heading text-sm font-bold text-text-primary">
                  Total
                </span>
                <span className="font-price text-lg font-bold text-bite-orange">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Place Order Button */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white px-5 py-4"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
      >
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full py-4 rounded-[18px] bg-bite-orange text-white font-heading font-semibold text-base hover:scale-[1.03] hover:shadow-lg transition-all duration-200 disabled:opacity-60"
        >
          {loading ? "Placing your order..." : `Grab Your Bite 🍊 — ₹${total}`}
        </button>
      </div>
    </div>
  );
}