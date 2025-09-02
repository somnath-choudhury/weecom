import type { ProductResponse, Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(
  skip = 0,
  search = "",
  category = ""
): Promise<ProductResponse> {
  const limit = 10;
  let url = "";

  if (search) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(
      search
    )}&limit=${limit}&skip=${skip}&delay=1000`;
  } else if (category && category !== "all") {
    url = `${BASE_URL}/category/${encodeURIComponent(
      category
    )}?limit=${limit}&skip=${skip}&delay=1000`;
  } else {
    url = `${BASE_URL}?limit=${limit}&skip=${skip}&delay=1000`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();

  return {
    products: data.products ?? [],
    total: data.total ?? 0,
    skip: data.skip ?? skip,
    limit: data.limit ?? limit,
  };
}

export async function addProduct(product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to add product");

  return res.json();
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to update product");

  return res.json();
}

export async function deleteProduct(id: number): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");

  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/categories?delay=500`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
