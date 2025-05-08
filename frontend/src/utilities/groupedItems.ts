import storeItems from "../data/items.json";

interface Item {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
}

interface GroupedItems {
  [key: string]: Item[];
}

const groupedItems: GroupedItems = storeItems.reduce(
  (acc: GroupedItems, item: Item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  },
  {}
);

export default groupedItems;
