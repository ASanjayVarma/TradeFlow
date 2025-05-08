const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;
const AUTH_API_PREFIX = import.meta.env.VITE_AUTH_API_BASE_PREFIX;
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;
const BACKEND_API_PREFIX = import.meta.env.VITE_BACKEND_API_PREFIX;

export const getApiUrl = (endpoint: string, isAuth = false) => {
  if (!endpoint.startsWith("/")) {
    throw new Error(
      `Invalid API endpoint: ${endpoint}. It must start with "/"`
    );
  }
  return isAuth
    ? `${AUTH_API_BASE_URL}${AUTH_API_PREFIX}${endpoint}`
    : `${BACKEND_API_BASE_URL}${BACKEND_API_PREFIX}${endpoint}`;
};

export const api = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await fetch(getApiUrl("/login", true), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error(`Login failed: ${res.status} ${res.statusText}`);
    }

    return res.json(); // Expecting { token: "VALID_TOKEN_123" }
  },

  signup: async (data: { name: string; email: string; password: string }) => {
    const res = await fetch(getApiUrl("/signup", true), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "Signup failed");
    }

    const textData = await res.text();
    return { message: textData };
  },

  fetchHomePageData: async () => {
    const res = await fetch(getApiUrl("/homepage"));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  fetchStoreDataByCategory: async () => {
    const res = await fetch(getApiUrl("/store"));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  fetchAllProducts: async () => {
    const res = await fetch(getApiUrl("/products"));
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },
  searchProducts: async (query: string) => {
    const res = await fetch(
      getApiUrl(`/products/search?query=${encodeURIComponent(query)}`)
    );
    if (!res.ok) throw new Error("Search failed");
    return res.json();
  },
};
  
  ;
  
  export const adminApi = {

  addProduct: async (formData: FormData) => {
    const res = await fetch(getApiUrl("/admin/add-product"), {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to add product.");
    return res.json();
  },

  removeProduct: async (category: string, productName: string) => {
    const res = await fetch(getApiUrl("/admin/remove-product"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, productName }),
    });
    if (!res.ok) throw new Error("Failed to remove product.");
    return res.json();
  },

  fetchMetadata: async () => {
    const res = await fetch(getApiUrl("/admin/metadata"));
    if (!res.ok) throw new Error("Failed to fetch metadata.");
    return res.json();
  },

  updateMetadata: async (metadata: any) => {
    const res = await fetch(getApiUrl("/admin/update-metadata"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    });
    if (!res.ok) throw new Error("Failed to update metadata.");
    return res.json();
  },
};
