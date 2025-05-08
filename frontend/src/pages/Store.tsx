import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import "./css/Store.css";
import useFetch from "../hooks/useFetch";
import { getApiUrl } from "../utilities/api";

// Define types directly in the Store.tsx file
interface StoreItem {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
}

interface GroupedItems {
  [category: string]: StoreItem[];
}



export function Store() {

  const {
    data: typedGroupedItems,
    loading,
    error,
  } = useFetch<GroupedItems>(
    getApiUrl("/store")
  );


  if (loading) return <h2 className="text-center">Loading products...</h2>;
  if (error) return <h2 className="text-center text-danger">{error}</h2>;

  return (
    <>
      <h1 className="text-center mb-4">Store</h1>
      {Object.keys(typedGroupedItems ?? {}).map((category) => (
        <div key={category} className="mb-5 pb-3 border-bottom">
          <h2 className="text-primary pb-2 mb-4">{category}</h2>
          <Row md={2} xs={1} lg={3} className="g-3">
            {(typedGroupedItems?.[category] ?? []).map((item) => (
              <Col key={item.id}>
                <div className="store-item shadow-sm rounded p-3">
                  <StoreItem {...item} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
}
