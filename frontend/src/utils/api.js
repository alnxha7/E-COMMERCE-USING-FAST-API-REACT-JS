const BASE_URL = "http://127.0.0.1:8000";

export async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers,
    },
  });

  // If token expired or invalid → clear storage and reload to login
  if (response.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
    return;
  }

  return response;
}