import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const cartIconRef = useRef(null);

  // 🧩 Load giỏ khi user thay đổi hoặc khi mới vào
  useEffect(() => {
    const loadCart = () => {
      if (!user) {
        const guestCart = localStorage.getItem("cart_guest");
        setCartItems(guestCart ? JSON.parse(guestCart) : []);
        return;
      }

      const userKey = `cart_${user.id}`;
      const saved = localStorage.getItem(userKey);
      setCartItems(saved ? JSON.parse(saved) : []);
    };

    loadCart();

    // 👂 Lắng nghe sự kiện khi AuthContext thay đổi
    window.addEventListener("authChanged", loadCart);
    return () => window.removeEventListener("authChanged", loadCart);
  }, [user]);

  // 💾 Lưu lại mỗi khi cartItems thay đổi
  useEffect(() => {
    const userKey = user ? `cart_${user.id}` : "cart_guest";
    localStorage.setItem(userKey, JSON.stringify(cartItems));
  }, [cartItems, user]);

  // 💰 Tổng tiền
  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🛒 Thêm sản phẩm
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === product.productId &&
          i.variantId === product.variantId
      );

      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId && i.variantId === product.variantId
            ? { ...i, quantity: i.quantity + (product.quantity || 1) }
            : i
        );
      }

      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // 🔄 Cập nhật số lượng
  const updateQuantity = (productId, variantId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ❌ Xóa 1 sản phẩm
  const removeFromCart = (productId, variantId = null) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            (variantId === null || item.variantId === variantId)
          )
      )
    );
  };

  // 🧹 Xóa toàn bộ
  const clearCart = () => {
    setCartItems([]);
    if (user) localStorage.removeItem(`cart_${user.id}`);
    else localStorage.removeItem("cart_guest");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
