import { useState } from "react";
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { adminApi } from "../../utilities/adminApiUrl";

const ProductManager = () => {
  const [addImage, setAddImage] = useState<File | null>(null);
  const [addName, setAddName] = useState("");
  const [addCategory, setAddCategory] = useState("Accessories");
  const [addPrice, setAddPrice] = useState("");

  const [removeName, setRemoveName] = useState("");
  const [removeCategory, setRemoveCategory] = useState("Accessories");

  const [addMessage, setAddMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addImage) return setAddMessage("Please select an image.");

    const formData = new FormData();
    formData.append("image", addImage);
    formData.append("productName", addName.trim() || addImage.name);
    formData.append("category", addCategory);
    formData.append("price", addPrice);

    try {
      setLoading(true);
      const res = await adminApi.addProduct(formData);
      setAddMessage(res.message);
      setAddImage(null);
      setAddName("");
      setAddPrice("");
    } catch (err) {
      setAddMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await adminApi.removeProduct(removeName, removeCategory);
      setRemoveMessage(res.message);
      setRemoveName("");
    } catch (err) {
      setRemoveMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      <h2>Manage Products</h2>

      {addMessage && <Alert variant="info">{addMessage}</Alert>}

      <Card className="p-4">
        <h4>Add Product</h4>
        <Form onSubmit={handleAddProduct} className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Product Image (JPG)</Form.Label>
            <Form.Control
              type="file"
              accept="image/jpeg"
              onChange={(e) =>
                setAddImage((e.target as HTMLInputElement).files?.[0] || null)
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Product Name (optional)</Form.Label>
            <Form.Control
              type="text"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              placeholder="Leave blank to use image filename"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
            >
              <option>Accessories</option>
              <option>Computer</option>
              <option>Smartphone</option>
              <option>Book</option>
              <option>Headphones</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={addPrice}
              onChange={(e) => setAddPrice(e.target.value)}
              placeholder="Enter price"
            />
          </Form.Group>

          <Button type="submit" disabled={loading} variant="primary">
            {loading ? <Spinner animation="border" size="sm" /> : "Add Product"}
          </Button>
        </Form>
      </Card>

      {removeMessage && <Alert variant="info">{removeMessage}</Alert>}

      <Card className="p-4">
        <h4>Remove Product</h4>
        <Form
          onSubmit={handleRemoveProduct}
          className="d-flex flex-column gap-3"
        >
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={removeName}
              onChange={(e) => setRemoveName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={removeCategory}
              onChange={(e) => setRemoveCategory(e.target.value)}
            >
              <option>Accessories</option>
              <option>Computer</option>
              <option>Smartphone</option>
              <option>Book</option>
              <option>Headphones</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" disabled={loading} variant="danger">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Remove Product"
            )}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ProductManager;
