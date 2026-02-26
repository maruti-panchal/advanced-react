const BASE_URL = "http://localhost:8080";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  id: string;
  userId: string;
  items: CartItem[];
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchCartApi(): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch cart");

  return response.json();
}

export async function addToCartApi(
  productId: string,
  quantity: number
): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) throw new Error("Failed to add item");

  return response.json();
}

export async function removeFromCartApi(
  productId: string
): Promise<CartResponse> {
  const response = await fetch(
    `${BASE_URL}/cart/items/${productId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) throw new Error("Failed to remove item");

  return response.json();
}

export async function clearCartApi(): Promise<CartResponse> {
  const response = await fetch(`${BASE_URL}/cart/clear`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to clear cart");

  return response.json();
}