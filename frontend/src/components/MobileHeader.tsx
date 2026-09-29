import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/auth.service";

export function MobileHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  function goTo(path: string) {
    navigate(path);
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
    <header className="mobile-header">
      <div className="mobile-user-info">
        <span>Bienvenido(a)</span>
        <strong>{user.fullName}</strong>

        <button
            className="mobile-balance"
            onClick={() =>
            navigate("/profile", {
                state: { scrollToRecharge: true },
            })
            }
        >
            $
            {user.balance.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            })}
        </button>
        </div>

      <button
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {menuOpen && (
        <nav className="mobile-menu">
          <button onClick={() => goTo("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => goTo("/profile")}>
            Mi Perfil
          </button>

          <button onClick={() => goTo("/last-transaction")}>
            Última recarga
          </button>

          <button className="mobile-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </nav>
      )}

      
    </header>

    <button
      className="mobile-recharge-button"
      onClick={() =>
        navigate("/profile", {
          state: { scrollToRecharge: true },
        })
      }
      aria-label="Recargar saldo"
    >
      +
    </button>
    </>
  );
}