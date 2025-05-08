import getAdminApiUrl from "./getAdminApiUrl";

const addProduct = async (product: FormData) => {
  // The `product` FormData object already has all fields and the image
  const res = await fetch(getAdminApiUrl("/admin/add-product"), {
    method: "POST",
    body: product,
  });

  console.log("Response status:", res.status);
  const data = await res.json();
  console.log("Response data:", data);

  if (!res.ok) {
    throw new Error(`Failed to add product: ${data.message || res.statusText}`);
  }

  return data;
};


const removeProduct = async (name: string, category: string) => {
  // Send the removal request to the backend
  const res = await fetch(getAdminApiUrl("/admin/remove-product"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName: name, category }),
  });

  if (!res.ok) {
    throw new Error("Failed to remove product");
  }

  return res.json();
};

const fetchAdminProducts = async () => {
  // Request to fetch all admin products
  const res = await fetch(getAdminApiUrl("/products"));
  if (!res.ok) {
    throw new Error("Failed to fetch admin products");
  }

  return res.json();
};

export const adminApi = {
  addProduct,
  removeProduct,
  fetchAdminProducts,
};

export { getAdminApiUrl };
