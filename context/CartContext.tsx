"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { calculateOrderTotals, getTaxRate } from "@/lib/pricing";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type AddItemInput = Omit<CartLine, "quantity">;

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  taxRate: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: AddItemInput, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "brg-cart-v1";
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const taxRate = getTaxRate();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart) as CartLine[]);
      }
    } catch {
      setItems([]);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, storageReady]);

  const addItem = (item: AddItemInput, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity)));

    setItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.min(99, cartItem.quantity + safeQuantity)
              }
            : cartItem
        );
      }

      return [...currentItems, { ...item, quantity: safeQuantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity)));
    setItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: safeQuantity } : cartItem
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((cartItem) => cartItem.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totals = calculateOrderTotals(subtotal, taxRate);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        taxRate,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
