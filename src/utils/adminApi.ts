const BASE_URL = "http://localhost:8080";

export interface ProductPayload {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function addProductApi(
  data: ProductPayload
) {
  const response = await fetch(
    `${BASE_URL}/admin/products`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Add failed");

  return response.json();
}

export async function updateProductApi(
  id: string,
  data: ProductPayload
) {
  const response = await fetch(
    `${BASE_URL}/admin/products/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Update failed");

  return response.json();
}

export async function deleteProductApi(id: string) {
  const response = await fetch(
    `${BASE_URL}/admin/products/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) throw new Error("Delete failed");
}