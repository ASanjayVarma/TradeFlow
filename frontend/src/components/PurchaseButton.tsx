import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useRecentlyBought } from "../context/RecentlyBoughtContext";

const PurchaseButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { cartItems, clearCart } = useShoppingCart();
  const { addRecentlyBoughtItems } = useRecentlyBought();

  const handlePurchase = () => {
    addRecentlyBoughtItems(cartItems); // Add items before clearing
    clearCart();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showModal) {
        setShowModal(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div className="d-flex justify-content-center mt-3 pb-3">
      <Button
        variant="primary"
        className="w-auto px-4"
        onClick={handlePurchase}
      >
        Rent
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have rented successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PurchaseButton;
