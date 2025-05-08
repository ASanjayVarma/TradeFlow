import { useRecentlyBought } from "../context/RecentlyBoughtContext";
import { renderSection } from "../components/renderSection";
import useFetch from "../hooks/useFetch";
import { getApiUrl } from "../utilities/api";
import "./css/Home.css";

interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
}

interface HomePageData {
  bestselling: Product[];
  editors_choice: Product[];
}

export function Home() {
  const { recentlyBoughtItems } = useRecentlyBought();

  const {
    data: HomePageData,
    loading,
    error,
  } = useFetch<HomePageData>(getApiUrl("/homepage"));

  const bestSellingItems = HomePageData?.bestselling ?? [];
  const editorsChoiceItems = HomePageData?.editors_choice ?? [];

  // Combine all products and filter recently bought from them
const allProducts = [
  ...(HomePageData?.bestselling ?? []),
  ...(HomePageData?.editors_choice ?? []),
];

  const filteredRecentlyBought = allProducts.filter((item) =>
    recentlyBoughtItems.some((boughtItem) => boughtItem.id === item.id)
  );


  if (loading) return <h2 className="text-center">Loading Home page...</h2>;
  if (error) return <h2 className="text-center text-danger">{error}</h2>;

  return (
    <div>
      {renderSection(
        bestSellingItems,
        "Best Selling",
        <h3 className="text-muted">
          Our best sellers will appear here soon! Start shopping to check them
          out.
        </h3>
      )}

      {renderSection(
        editorsChoiceItems,
        "Editor’s Choice",
        <h3 className="text-muted">
          The editor's favorite picks will show up here shortly. Stay tuned!
        </h3>
      )}

      {renderSection(
        filteredRecentlyBought,
        "Recently Bought",
        <>
          <h3 className="text-muted">No recent purchases</h3>
          <p className="text-secondary recently-bought-message">
            Your recently bought items will appear here. Start shopping to see
            them!
          </p>
        </>
      )}
    </div>
  );
}
