import { api } from "./api";

const fetchProducts = async () => {
  try {
    const data = await api.fetchStoreDataByCategory() as Record<string, any[]>;

    const allProducts = Object.entries(data) // each entry is [categoryName, products[]]
      .flatMap(([categoryName, products]: [string, any[]]) =>
        products.map((product) => ({
          name: product.name,
          category: product.category || categoryName, // fallback if not present
        }))
      );

    return allProducts;
  } catch (err) {
    console.error("Error fetching store data:", err);
    throw err;
  }
};
export default fetchProducts;
