import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import React from "react";

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string; // Add category here
};

// Wrap StoreItem with React.memo
export const StoreItem = React.memo(
  ({ id, name, price, imgUrl, category }: StoreItemProps) => {
    const {
      getItemQuantity,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
    } = useShoppingCart();

    const quantity = getItemQuantity(id);

    return (
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imgUrl}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={
                  () =>
                    increaseCartQuantity({
                      id,
                      name,
                      price,
                      imgUrl,
                      category,
                      quantity: 1,
                    }) // Pass full item
                }
              >
                + Add To Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span> in cart
                  </div>
                  <Button
                    onClick={
                      () =>
                        increaseCartQuantity({
                          id,
                          name,
                          price,
                          imgUrl,
                          category,
                          quantity: 1,
                        }) // Pass full item
                    }
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => removeFromCart(id)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }
);

// Add a display name for better debugging
StoreItem.displayName = "StoreItem";
