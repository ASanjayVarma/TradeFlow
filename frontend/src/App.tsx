import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { RecentlyBoughtProvider } from "./context/RecentlyBoughtContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer"; // Import the new Footer component
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import {ProductSearchResults} from "./pages/ProductSearchResults"; // Import the new ProductSearchResults component

function App() {
  return (
    <AuthProvider>
      <RecentlyBoughtProvider>
        <ShoppingCartProvider>
          <Navbar />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/search" element={<ProductSearchResults />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
            </Routes>
          </Container>
          <Footer /> {/* Use the new Footer component */}
        </ShoppingCartProvider>
      </RecentlyBoughtProvider>
    </AuthProvider>
  );
}

export default App;
