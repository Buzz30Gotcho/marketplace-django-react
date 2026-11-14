// Petit client pour parler a l'API Django.
const BASE_URL = "http://127.0.0.1:8002";

export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

function headers(auth = true) {
  const h = { "Content-Type": "application/json" };
  const token = getToken();
  if (auth && token) h["Authorization"] = `Token ${token}`;
  return h;
}

export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Identifiants invalides");
  const data = await res.json();
  localStorage.setItem("token", data.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export async function getProducts(search = "", category = "") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const query = params.toString() ? `?${params}` : "";
  const res = await fetch(`${BASE_URL}/api/products/${query}`);
  if (!res.ok) throw new Error("Impossible de charger les produits");
  return (await res.json()).results;
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/categories/`);
  if (!res.ok) throw new Error("Impossible de charger les categories");
  return (await res.json()).results;
}

export async function createProduct(product) {
  const res = await fetch(`${BASE_URL}/api/products/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error(JSON.stringify(await res.json()));
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}/`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Suppression impossible");
}

export async function createCategory(name) {
  const res = await fetch(`${BASE_URL}/api/categories/`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(JSON.stringify(await res.json()));
  return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/api/categories/${id}/`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Suppression impossible");
}
