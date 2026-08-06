import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 40;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + tax;

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
      <div className="px-5 pt-8 pb-5"
        style={{ background: "linear-gradient(135deg, #F97316 0%, #FDBA74 60%, #FFFBF7 100%)" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            ←
          </button>
          <h1 className="font-heading text-2xl font-bold text-white">
            Your Bites 🛒
          </h1>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-5 pt-5 space-y-3">
        {cart.map((item) => (
          <div key={item.food._id}
            className="bg-white rounded-[24px] p-4 flex items-center gap-4"
            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>

            <div className="w-16 h-16 rounded-[16px] bg-orange-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {item.food.images?.[0] ? (
                <img src={item.food.images[0]} alt={item.food.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🍽️</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-sm font-bold text-text-primary truncate">
                {item.food.name}
              </h3>
              <p className="font-price font-bold text-bite-orange text-sm mt-1">
                ₹{item.food.discountPrice || item.food.price}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-bg-cream rounded-full px-3 py-1.5">
              <button
                onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
                className="w-6 h-6 rounded-full bg-white text-text-primary font-bold flex items-center justify-center hover:bg-bite-orange hover:text-white transition-all"
              >
                −
              </button>
              <span className="font-heading font-bold text-text-primary w-4 text-center text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                className="w-6 h-6 rounded-full bg-bite-orange text-white font-bold flex items-center justify-center hover:scale-110 transition-all"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.food._id)}
              className="text-tomato text-lg hover:scale-110 transition-all"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Bill Summary */}
      <div className="px-5 mt-6">
        <div className="bg-white rounded-[24px] p-5"
          style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
          <h3 className="font-heading text-sm font-bold text-text-primary mb-3">
            Bill Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-body text-sm text-text-secondary">Subtotal</span>
              <span className="font-body text-sm text-text-primary">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-sm text-text-secondary">Delivery Fee</span>
              <span className="font-body text-sm text-text-primary">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-sm text-text-secondary">Tax</span>
              <span className="font-body text-sm text-text-primary">₹{tax}</span>
            </div>
            <div className="border-t border-border-gray pt-2 mt-2 flex justify-between">
              <span className="font-heading text-sm font-bold text-text-primary">Total</span>
              <span className="font-price text-lg font-bold text-bite-orange">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-5 py-4"
        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        <button
          onClick={() => navigate("/checkout")}
          className="w-full py-4 rounded-[18px] bg-bite-orange text-white font-heading font-semibold text-base hover:scale-[1.03] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          Ready to Bite 🍊 — ₹{total}
        </button>
      </div>
    </div>
  );
}