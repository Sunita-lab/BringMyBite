import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="text-5xl animate-bounce">🍊</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center px-5">
        <div className="text-center">
          <div className="text-5xl mb-3">😕</div>
          <p className="font-heading text-lg font-bold text-text-primary mb-4">
            Couldn't find that order
          </p>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold hover:scale-[1.03] transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream flex items-center justify-center px-5 py-10">
      <div
        className="w-full max-w-md rounded-[24px] bg-white p-8 text-center"
        style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      >
        {/* Success Icon */}
        <div className="text-7xl mb-4">🎉</div>

        <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">
          Your bite has arrived! 🍕
        </h1>
        <p className="font-body text-text-secondary text-sm mb-6">
          Well, it's on its way — order confirmed and being prepared.
        </p>

        {/* Order Info */}
        <div className="bg-bg-cream rounded-[18px] p-4 mb-4 text-left">
          <div className="flex justify-between mb-2">
            <span className="font-body text-sm text-text-secondary">
              Order ID
            </span>
            <span className="font-body text-sm text-text-primary font-semibold">
              #{order._id.slice(-8).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-body text-sm text-text-secondary">
              Status
            </span>
            <span className="font-body text-sm text-fresh-green font-semibold capitalize">
              {order.status}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-body text-sm text-text-secondary">
              Estimated Time
            </span>
            <span className="font-body text-sm text-text-primary">
              {order.estimatedTime} mins
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm text-text-secondary">
              Payment
            </span>
            <span className="font-body text-sm text-text-primary capitalize">
              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="text-left mb-4">
          <p className="font-heading text-xs font-bold text-text-secondary mb-2">
            ITEMS
          </p>
          <div className="space-y-1">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between font-body text-sm">
                <span className="text-text-secondary">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-text-primary">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between border-t border-border-gray pt-3 mb-6">
          <span className="font-heading text-sm font-bold text-text-primary">
            Total Paid
          </span>
          <span className="font-price text-lg font-bold text-bite-orange">
            ₹{order.total}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold hover:scale-[1.03] hover:shadow-lg transition-all duration-200"
          >
            Track Your Order
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 rounded-[18px] bg-white border border-border-gray text-text-primary font-heading font-semibold hover:bg-bg-cream transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}