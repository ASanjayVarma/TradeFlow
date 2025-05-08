const ADMIN_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;
const ADMIN_API_PREFIX = import.meta.env.VITE_BACKEND_API_PREFIX;

const getAdminApiUrl = (endpoint: string) => {
  if (!endpoint.startsWith("/")) {
    throw new Error(
      `Invalid admin API endpoint: ${endpoint}. It must start with "/"`
    );
  }
  return `${ADMIN_API_BASE_URL}${ADMIN_API_PREFIX}${endpoint}`;
};

export default getAdminApiUrl;
