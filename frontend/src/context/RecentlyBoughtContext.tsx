import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
  quantity: number;
};

type RecentlyBoughtProviderProps = {
  children: ReactNode;
};

type RecentlyBoughtContextType = {
  recentlyBoughtItems: CartItem[];
  addRecentlyBoughtItems: (items: CartItem[]) => void;
  clearRecentlyBought: () => void;
};

const RecentlyBoughtContext = createContext({} as RecentlyBoughtContextType);

export function useRecentlyBought() {
  return useContext(RecentlyBoughtContext);
}

export function RecentlyBoughtProvider({
  children,
}: RecentlyBoughtProviderProps) {
  const [recentlyBoughtItems, setRecentlyBoughtItems] = useLocalStorage<
    CartItem[]
  >("recentlyBoughtItems", []);

  const addRecentlyBoughtItems = (items: CartItem[]) => {
    setRecentlyBoughtItems((prevItems) => [...prevItems, ...items]);
  };

  const clearRecentlyBought = () => {
    setRecentlyBoughtItems([]);
  };

  return (
    <RecentlyBoughtContext.Provider
      value={{
        recentlyBoughtItems,
        addRecentlyBoughtItems,
        clearRecentlyBought,
      }}
    >
      {children}
    </RecentlyBoughtContext.Provider>
  );
}
