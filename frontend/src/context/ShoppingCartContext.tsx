import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRecentlyBought } from "./RecentlyBoughtContext";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (item: CartItem) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const { addRecentlyBoughtItems } = useRecentlyBought();



  const clearCart = () => {
    const newBoughtItems = cartItems.map((item) => ({ ...item }));
    addRecentlyBoughtItems(newBoughtItems);
    setCartItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

function increaseCartQuantity(newItem: CartItem) {
  console.log("Adding to cart:", newItem);
  console.log("Type of newItem.id:", typeof newItem.id); // Debugging

  setCartItems((currItems) => {
    const existingItem = currItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      // Item exists, increase quantity
      return currItems.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // New item, add with quantity 1
      return [...currItems, { ...newItem, quantity: 1 }];
    }
  });
}

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );


  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      return currItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 } // Reduce quantity
            : item
        )
        .filter((item) => item.quantity > 0); // Remove only if quantity becomes 0
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }


  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        clearCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
