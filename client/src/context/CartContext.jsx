import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // App load hote hi localStorage se cart uthao
  useEffect(() => {
    const stored = localStorage.getItem("bringmybite_cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Cart change hote hi localStorage update karo
  useEffect(() => {
    localStorage.setItem("bringmybite_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.food._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { food, quantity }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prev) => prev.filter((item) => item.food._id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) {
      removeFromCart(foodId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.food._id === foodId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("bringmybite_cart");
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.food.discountPrice || item.food.price) * item.quantity,
    0
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);