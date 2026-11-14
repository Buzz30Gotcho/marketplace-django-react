import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../api";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(search, activeCategory)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, activeCategory]);

  return (
    <div>
      <div className="page-head">
        <h1>Catalogue produits</h1>
        <input
          type="search"
          className="search"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="chips">
        <button
          className={`chip ${activeCategory === "" ? "active" : ""}`}
          onClick={() => setActiveCategory("")}
        >
          Toutes
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${String(activeCategory) === String(c.id) ? "active" : ""}`}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {error && <p className="state error">Erreur : {error}</p>}
      {loading && <p className="state">Chargement...</p>}
      {!loading && !error && products.length === 0 && (
        <p className="state">Aucun produit trouve.</p>
      )}

      <div className="grid">
        {products.map((p) => (
          <article className="card" key={p.id}>
            <span className="tag">{p.category_name}</span>
            <h2>{p.name}</h2>
            <p className="desc">{p.description || "Pas de description"}</p>
            <p className="price">{p.price} &euro;</p>
            <p className="meta">
              Stock : {p.stock} &middot; {p.supplier}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
