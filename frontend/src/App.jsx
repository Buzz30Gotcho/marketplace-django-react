import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8002/api/products/";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recharge la liste depuis l'API a chaque changement de recherche
  useEffect(() => {
    setLoading(true);
    const url = search ? `${API_URL}?search=${encodeURIComponent(search)}` : API_URL;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de contacter l'API");
        return res.json();
      })
      .then((data) => {
        setProducts(data.results);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="app">
      <header className="topbar">
        <h1>Catalogue produits</h1>
        <input
          type="search"
          className="search"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {error && <p className="state error">Erreur : {error}</p>}
      {loading && <p className="state">Chargement...</p>}
      {!loading && !error && products.length === 0 && (
        <p className="state">Aucun produit trouve.</p>
      )}

      <div className="grid">
        {products.map((p) => (
          <article className="card" key={p.id}>
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

export default App;
