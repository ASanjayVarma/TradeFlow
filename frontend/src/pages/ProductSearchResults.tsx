import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import "./css/Store.css";
import { api } from "../utilities/api";

interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
}

export function ProductSearchResults() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const result = await api.searchProducts(query);
      setProducts(result);
    } catch (err: any) {
      setError("Search Not Found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center mb-4">Search Products</h1>

      <Form
        onSubmit={handleSearch}
        className="d-flex justify-content-center mb-4"
      >
        <Form.Control
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: "400px" }}
          className="me-2"
        />
        <Button type="submit">Search</Button>
      </Form>

      {loading && <h2 className="text-center">Searching...</h2>}
      {error && <h2 className="text-center text-danger">{error}</h2>}

      {!loading && !error && products.length === 0 && (
        <h2 className="text-center">No products found.</h2>
      )}

      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <div className="store-item shadow-sm rounded p-3">
              <StoreItem {...item} />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
