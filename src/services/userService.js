const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users?page=2`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Fetch failed");
  }

  const data = await response.json();
  return data.data;
};
