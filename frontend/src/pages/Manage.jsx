import { useEffect, useState } from "react";
import {
  login,
  getProducts,
  getCategories,
  createProduct,
  deleteProduct,
  createCategory,
  deleteCategory,
} from "../api";

const EMPTY_PRODUCT = {
  name: "",
  description: "",
  price: "",
  stock: "",
  supplier: "",
  category: "",
};

function Manage({ logged, setLogged }) {
  // --- Connexion ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  // --- Donnees ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [product, setProduct] = useState(EMPTY_PRODUCT);
  const [formError, setFormError] = useState(null);

  const reload = () => {
    getProducts().then(setProducts).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
  };

  useEffect(() => {
    if (logged) reload();
  }, [logged]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setLoginError(null);
      setLogged(true);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await createCategory(newCategory.trim());
      setNewCategory("");
      reload();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...product,
        price: product.price,
        stock: Number(product.stock) || 0,
      });
      setProduct(EMPTY_PRODUCT);
      setFormError(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const updateField = (field) => (e) =>
    setProduct({ ...product, [field]: e.target.value });

  // --- Ecran de connexion ---
  if (!logged) {
    return (
      <div className="login-box">
        <h1>Connexion</h1>
        <p className="hint">Connecte-toi pour gerer le catalogue.</p>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="state error">{loginError}</p>}
          <button type="submit" className="btn-primary">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  // --- Panneau de gestion ---
  return (
    <div className="manage">
      <h1>Gestion du catalogue</h1>

      <section className="panel">
        <h2>Categories</h2>
        <form className="inline-form" onSubmit={handleAddCategory}>
          <input
            placeholder="Nouvelle categorie"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Ajouter
          </button>
        </form>
        <ul className="list">
          {categories.map((c) => (
            <li key={c.id}>
              <span>{c.name}</span>
              <button
                className="btn-del"
                onClick={() => deleteCategory(c.id).then(reload)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Ajouter un produit</h2>
        <form className="product-form" onSubmit={handleAddProduct}>
          <input placeholder="Nom" value={product.name} onChange={updateField("name")} required />
          <input placeholder="Fournisseur" value={product.supplier} onChange={updateField("supplier")} required />
          <input placeholder="Prix (ex: 12.50)" value={product.price} onChange={updateField("price")} required />
          <input placeholder="Stock" type="number" value={product.stock} onChange={updateField("stock")} />
          <select value={product.category} onChange={updateField("category")} required>
            <option value="">-- Categorie --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={product.description}
            onChange={updateField("description")}
          />
          <button type="submit" className="btn-primary">
            Creer le produit
          </button>
        </form>
        {formError && <p className="state error">{formError}</p>}
      </section>

      <section className="panel">
        <h2>Produits ({products.length})</h2>
        <ul className="list">
          {products.map((p) => (
            <li key={p.id}>
              <span>
                <strong>{p.name}</strong> &middot; {p.price} &euro; &middot; {p.category_name}
              </span>
              <button
                className="btn-del"
                onClick={() => deleteProduct(p.id).then(reload)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Manage;
