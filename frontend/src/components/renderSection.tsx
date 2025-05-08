import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

// Define the StoreItem type (if not already defined)
interface StoreItemType {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
}

// Function to render a store section
export const renderSection = (
  items: StoreItemType[], // Explicitly define the expected array type
  title: string,
  emptyMessage: JSX.Element
) => {
  return (
    <div className="mb-5">
      <h2 className="text-primary pb-2 mb-4">{title}</h2>
      {items?.length > 0 ? (
        <Row md={2} xs={1} lg={3} className="g-3">
          {items.map((item) => (
            <Col key={item.id}>
              <div className="store-item shadow-sm rounded p-3">
                <StoreItem {...item} />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-5">{emptyMessage}</div>
      )}
    </div>
  );
};
