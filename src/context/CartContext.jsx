"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const CartContext = createContext(null);

const MAX_ITEM_QTY = 20;
const CART_STORAGE_KEY = "cashlessdine-cart";
const ORDER_STORAGE_KEY = "cashlessdine-last-order";

function loadFromStorage(key) {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [lastOrder, setLastOrderState] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedCart = loadFromStorage(CART_STORAGE_KEY);
    if (savedCart && Array.isArray(savedCart)) setItems(savedCart);

    const savedOrder = loadFromStorage(ORDER_STORAGE_KEY);
    if (savedOrder) setLastOrderState(savedOrder);

    setHydrated(true);
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    if (hydrated) saveToStorage(CART_STORAGE_KEY, items);
  }, [items, hydrated]);

  // Persist last order to localStorage on change
  useEffect(() => {
    if (hydrated) saveToStorage(ORDER_STORAGE_KEY, lastOrder);
  }, [lastOrder, hydrated]);

  const addItem = useCallback((foodItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === foodItem.id);
      if (existing) {
        if (existing.quantity >= MAX_ITEM_QTY) return prev;
        return prev.map((i) =>
          i.id === foodItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: foodItem.id,
          name: foodItem.name,
          price: foodItem.price,
          image: foodItem.image,
          category: foodItem.category,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, newQty) => {
    if (newQty < 1) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      return;
    }
    if (newQty > MAX_ITEM_QTY) return;
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const setLastOrder = useCallback((order) => {
    setLastOrderState(order);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      lastOrder,
      setLastOrder,
      MAX_ITEM_QTY,
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, lastOrder, setLastOrder]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
