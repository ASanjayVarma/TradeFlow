import { Container, Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductManager from "./ProductManager";
import MetadataManager from "./MetadataManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"products" | "metadata">("products");

  const handleLogout = () => {
    navigate("/admin");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => setView("products")}>Products</Nav.Link>
            <Nav.Link onClick={() => setView("metadata")}>Metadata</Nav.Link>
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              className="ms-3"
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {view === "products" && <ProductManager />}
        {view === "metadata" && <MetadataManager />}
      </Container>
    </>
  );
};

export default AdminDashboard;
