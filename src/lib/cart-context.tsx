"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "./types";

type CartContextValue = {
  lines: CartLine[];
  addItem: (item: CartLine) => void;
  removeItem: (slug: string, color: string, size: string) => void;
  updateQuantity: (slug: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aftersix-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time sync from localStorage on mount (external system, not derivable during render).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((item: CartLine) => {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.slug === item.slug && l.color === item.color && l.size === item.size
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + item.quantity } : l
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string, color: string, size: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.slug === slug && l.color === color && l.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (slug: string, color: string, size: string, quantity: number) => {
      setLines((prev) =>
        prev.map((l) =>
          l.slug === slug && l.color === color && l.size === size
            ? { ...l, quantity: Math.max(1, quantity) }
            : l
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setLines([]), []);

  const totalItems = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity * l.price, 0),
    [lines]
  );

  const value = useMemo(
    () => ({ lines, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }),
    [lines, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
