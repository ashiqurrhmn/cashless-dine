"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { seedOrders, seedReservations } from "@/data/user";

const CartContext = createContext(null);

const MAX_ITEM_QTY = 20;
const CART_STORAGE_KEY = "cashlessdine-cart";
const ORDER_STORAGE_KEY = "cashlessdine-last-order";
const ALL_ORDERS_KEY = "cashlessdine-all-orders-v2";
const RESERVATIONS_KEY = "cashlessdine-reservations-v2";
const FAVORITES_KEY = "cashlessdine-favorites";

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
  const [allOrders, setAllOrdersState] = useState([]);
  const [reservations, setReservationsState] = useState([]);
  const [sessionReservations, setSessionReservations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (with seed fallback)
  useEffect(() => {
    const savedCart = loadFromStorage(CART_STORAGE_KEY);
    if (savedCart && Array.isArray(savedCart)) setItems(savedCart);

    const savedOrder = loadFromStorage(ORDER_STORAGE_KEY);
    if (savedOrder) setLastOrderState(savedOrder);

    const savedAllOrders = loadFromStorage(ALL_ORDERS_KEY);
    setAllOrdersState(savedAllOrders && Array.isArray(savedAllOrders) ? savedAllOrders : seedOrders);

    const savedReservations = loadFromStorage(RESERVATIONS_KEY);
    const rawReservations = savedReservations && Array.isArray(savedReservations) ? savedReservations : seedReservations;
    // Deduplicate by id — stale localStorage may contain collisions from
    // the old sequential counter that reset on every page reload.
    const seen = new Set();
    const deduped = rawReservations.filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    });
    setReservationsState(deduped);
    // Persist the cleaned list so the warning doesn't recur
    if (deduped.length !== rawReservations.length) {
      saveToStorage(RESERVATIONS_KEY, deduped);
    }

    const savedFavorites = loadFromStorage(FAVORITES_KEY);
    if (savedFavorites && Array.isArray(savedFavorites)) setFavorites(savedFavorites);

    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) saveToStorage(CART_STORAGE_KEY, items);
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) saveToStorage(ORDER_STORAGE_KEY, lastOrder);
  }, [lastOrder, hydrated]);

  useEffect(() => {
    if (hydrated) saveToStorage(ALL_ORDERS_KEY, allOrders);
  }, [allOrders, hydrated]);

  useEffect(() => {
    if (hydrated) saveToStorage(RESERVATIONS_KEY, reservations);
  }, [reservations, hydrated]);

  useEffect(() => {
    if (hydrated) saveToStorage(FAVORITES_KEY, favorites);
  }, [favorites, hydrated]);

  // ── Cart actions ──

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

  // ── Order actions ──

  const setLastOrder = useCallback((order) => {
    setLastOrderState(order);
  }, []);

  const addOrder = useCallback((order) => {
    setAllOrdersState((prev) => [order, ...prev]);
  }, []);

  // ── Reservation actions ──

  const addReservation = useCallback((reservation) => {
    setReservationsState((prev) => [reservation, ...prev]);
    setSessionReservations((prev) => [...prev, reservation]);
  }, []);

  // ── Favorites actions ──

  const toggleFavorite = useCallback((foodId) => {
    setFavorites((prev) => 
      prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
    );
  }, []);

  // ── Computed ──

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
      allOrders,
      addOrder,
      reservations,
      sessionReservations,
      addReservation,
      favorites,
      toggleFavorite,
      MAX_ITEM_QTY,
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, lastOrder, setLastOrder, allOrders, addOrder, reservations, sessionReservations, addReservation, favorites, toggleFavorite]
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
