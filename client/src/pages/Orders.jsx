import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const statusColors = {
  placed: { bg: "bg-sky/10", text: "text-sky" },
  preparing: { bg: "bg-honey-gold/10", text: "text-honey-gold" },
  ready: { bg: "bg-honey-gold/10", text: "text-honey-gold" },
  picked: { bg: "bg-sky/10", text: "text-sky" },
  "on-the-way": { bg: "bg-sky/10", text: "text-sky" },
  delivered: { bg: "bg-fresh-green/10", text: "text-fresh-green" },
  cancelled: { bg: "bg-tomato/10", text: "text-tomato" },
};

const statusLabels = {
  placed: "Placed",
  preparing: "Preparing",
  ready: "Ready",
  picked: "Picked Up",
  "on-the-way": "On the Way",
  delivered: "Delivered 🍕",
  cancelled: "Cancelled",
};

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/my-orders");
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="text-5xl animate-bounce">🍊</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-cream pb-10">
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
            onClick={() => navigate("/home")}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            ←
          </button>
          <h1 className="font-heading text-2xl font-bold text-white">
            Bite History 🍊
          </h1>
        </div>
      </div>

      <div className="px-5 pt-6">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍕</div>
            <h2 className="font-heading text-lg font-bold text-text-primary mb-1">
              No bites yet
            </h2>
            <p className="font-body text-text-secondary text-sm mb-6">
              Your order history will show up here.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 rounded-[18px] bg-bite-orange text-white font-heading font-semibold hover:scale-[1.03] transition-all"
            >
              Browse Bites
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusStyle = statusColors[order.status] || statusColors.placed;
              return (
                <div
                  key={order._id}
                  onClick={() => navigate(`/order-success/${order._id}`)}
                  className="bg-white rounded-[24px] p-5 cursor-pointer hover:-translate-y-1 transition-all duration-200"
                  style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}
                >
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-xs text-text-secondary">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="mb-3">
                    <p className="font-body text-sm text-text-primary">
                      {order.items
                        .slice(0, 2)
                        .map((item) => `${item.name} × ${item.quantity}`)
                        .join(", ")}
                      {order.items.length > 2 &&
                        ` +${order.items.length - 2} more`}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between border-t border-border-gray pt-3">
                    <span className="font-body text-xs text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="font-price font-bold text-bite-orange text-sm">
                      ₹{order.total}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}