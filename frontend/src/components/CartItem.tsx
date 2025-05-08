import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import LazyImage from "../utilities/LazyImage";
import React from "react";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
  quantity: number;
};

export function CartItem({
  id,
  name,
  price,
  imgUrl,
  category,
  quantity,
}: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <MemoizedLazyImage src={imgUrl} alt={name} />

      <div className="me-auto">
        <div>{name}</div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(price)}
        </div>
      </div>

      {/* Total Price (price * quantity) behind "-" button */}
      <span className="text-muted">{formatCurrency(price * quantity)}</span>

      {/* "-" Button: Disabled if quantity is 1 */}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => decreaseCartQuantity(id)}
        disabled={quantity === 1}
        style={quantity === 1 ? { opacity: 0.5, cursor: "not-allowed" } : {}}
      >
        -
      </Button>

      {/* Quantity Displayed in Between */}
      <span className="px-2">{quantity}</span>

      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() =>
          increaseCartQuantity({
            id,
            name,
            price,
            imgUrl,
            category,
            quantity,
          })
        }
      >
        +
      </Button>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

// Memoized LazyImage to prevent unnecessary re-renders
const MemoizedLazyImage = React.memo(
  ({ src, alt }: { src: string; alt: string }) => (
    <LazyImage
      src={src}
      alt={alt}
      width={125}
      height={75}
      style={{ objectFit: "cover" }}
    />
  )
);
