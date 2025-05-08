import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import fetchProducts from "../../utilities/fetchProducts";
import getAdminApiUrl from "../../utilities/getAdminApiUrl";
import MetadataSection from "./MetadataSection";

// Read from .env
const TAG_TYPES = (import.meta.env.VITE_ADMIN_PRODUCT_TAGS as string)
  .split(",")
  .map((tag) => tag.trim()) as string[];

type Metadata = {
  [key in (typeof TAG_TYPES)[number]]: string[];
};

const MetadataManager: React.FC = () => {
  const [metadata, setMetadata] = useState<Partial<Metadata>>({});
  const [products, setProducts] = useState<
    { name: string; category: string }[]
  >([]);
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const res = await fetch("/api/admin/metadata");
      const data = await res.json();

      const loadedMetadata: Partial<Metadata> = {};
      TAG_TYPES.forEach((tag) => {
        loadedMetadata[tag] = data[tag]?.map((p: any) => p.name) ?? [];
      });
      setMetadata(loadedMetadata);
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      setProducts(
        allProducts.map((p: any) => ({
          name: p.name,
          category: p.category ?? "default",
        }))
      );
    };
    loadProducts();
  }, []);

  const handleAdd = (tag: string, productName: string) => {
    if (productName && !metadata[tag]?.includes(productName)) {
      setMetadata((prev) => ({
        ...prev,
        [tag]: [...(prev[tag] ?? []), productName],
      }));
    }
  };

  const handleRemove = (tag: string, productName: string) => {
    setMetadata((prev) => ({
      ...prev,
      [tag]: (prev[tag] ?? []).filter((item) => item !== productName),
    }));
  };

  const handleUpdateMetadata = async () => {
    try {
      const entriesToAdd: {
        section: string;
        category: string;
        product: string;
      }[] = [];

      TAG_TYPES.forEach((tag) => {
        (metadata[tag] ?? []).forEach((productName) => {
          const productData = products.find((p) => p.name === productName);
          if (productData) {
            entriesToAdd.push({
              section: tag,
              category: productData.category,
              product: productName,
            });
          }
        });
      });

      const url = getAdminApiUrl("/admin/metadata/add");
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entriesToAdd),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: "Metadata updated successfully!",
        });
        setMetadata({});
      } else {
        setAlert({ type: "danger", message: "Error updating metadata." });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "danger", message: "Network error." });
    }
  };

  return (
    <>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}
      {TAG_TYPES.map((tag) => (
        <MetadataSection
          key={tag}
          tag={tag}
          products={products}
          metadata={metadata[tag] ?? []}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      ))}
      <Button variant="primary" onClick={handleUpdateMetadata} className="mt-3">
        Save Changes
      </Button>
    </>
  );
};

export default MetadataManager;
