import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { useAuth } from "../contexts/AuthContext";


export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        Fastnail
      </div>

      <div className="sidebar-account">
        <div className="sidebar-user">
        <div className="sidebar-user-info">
          <span>Bienvenido(a)</span>
          <strong>{user.fullName}</strong>
        </div>
      </div>

      <div className="sidebar-balance">
        <span className="balance-symbol">$</span>

        <strong>
          {user.balance.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </strong>

        <button
          className="balance-add-button"
          onClick={() =>
            navigate("/profile", {
              state: { scrollToRecharge: true },
            })
          }
          title="Agregar saldo"
        >
          +
        </button>
      </div>
      </div>

      <nav className="sidebar-nav">
        <nav className="sidebar-nav">
  <button
    className={location.pathname === "/dashboard" ? "active" : ""}
    onClick={() => navigate("/dashboard")}
  >
    Dashboard
  </button>

  <button
    className={location.pathname === "/profile" ? "active" : ""}
    onClick={() => navigate("/profile")}
  >
    Mi Perfil
  </button>

  <button
    className={location.pathname === "/last-transaction" ? "active" : ""}
    onClick={() => navigate("/last-transaction")}
  >
    Última recarga
  </button>
</nav>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
}