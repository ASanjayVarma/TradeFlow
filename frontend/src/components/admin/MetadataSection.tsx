import React, { useState } from "react";
import { Card, Button, Form, Badge } from "react-bootstrap";

interface MetadataSectionProps {
  tag: string;
  products: { name: string; category: string }[];
  metadata: string[];
  onAdd: (tag: string, productName: string) => void;
  onRemove: (tag: string, productName: string) => void;
}

const MetadataSection: React.FC<MetadataSectionProps> = ({
  tag,
  products,
  metadata,
  onAdd,
  onRemove,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProductName, setNewProductName] = useState("");

  const getCategories = () => {
    return Array.from(new Set(products.map((p) => p.category)));
  };

  const handleAdd = () => {
    if (newProductName.trim()) {
      onAdd(tag, newProductName.trim());
      setNewProductName("");
      setSelectedCategory("");
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5>
          <Badge bg="secondary" className="me-2">
            {tag.replace("_", " ").toUpperCase()}
          </Badge>
        </h5>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setNewProductName("");
            }}
          >
            <option value="">Select category</option>
            {getCategories().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {selectedCategory && (
          <Form.Group className="mb-3">
            <Form.Label>Select Product in {selectedCategory}</Form.Label>
            <Form.Control
              as="select"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            >
              <option value="">Select product</option>
              {products
                .filter(
                  (p) =>
                    p.category === selectedCategory &&
                    !metadata.includes(p.name)
                )
                .map((product) => (
                  <option key={product.name} value={product.name}>
                    {product.name}
                  </option>
                ))}
            </Form.Control>
            <Button
              className="mt-2"
              onClick={handleAdd}
              disabled={!newProductName}
            >
              Add
            </Button>
          </Form.Group>
        )}

        <div className="mt-3">
          {metadata.map((productName) => (
            <Badge pill bg="primary" key={productName} className="me-2 mb-2">
              {productName}{" "}
              <Button
                variant="light"
                size="sm"
                onClick={() => onRemove(tag, productName)}
                className="ms-1 p-0"
              >
                ✕
              </Button>
            </Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MetadataSection;
