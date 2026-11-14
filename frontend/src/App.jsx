import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { isLoggedIn, logout } from "./api";
import Catalog from "./pages/Catalog";
import Manage from "./pages/Manage";
import "./App.css";

function App() {
  const [logged, setLogged] = useState(isLoggedIn());

  const handleLogout = () => {
    logout();
    setLogged(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <span className="brand">Marketplace</span>
        <div className="nav-links">
          <NavLink to="/" end>
            Catalogue
          </NavLink>
          <NavLink to="/gestion">Gestion</NavLink>
        </div>
        {logged && (
          <button className="btn-logout" onClick={handleLogout}>
            Se deconnecter
          </button>
        )}
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/gestion" element={<Manage logged={logged} setLogged={setLogged} />} />
        </Routes>
      </main>

      <footer className="footer">
        Projet Django REST Framework + React &middot; Frederic Makha SAR
      </footer>
    </div>
  );
}

export default App;
