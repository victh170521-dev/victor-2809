import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { refreshUser } = useAuth();


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");

  try {
    await login(email, password);
    refreshUser();
    navigate("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
}

  return (
  <div className="auth-page">
    <div className="auth-card">

      <h1>Iniciar sesión</h1>
      <p className="auth-subtitle">
        Ingresa tus datos para continuar
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit">
          Iniciar sesión
        </button>
      </form>

      <p className="auth-switch">
        ¿No tienes una cuenta?{" "}
        <button type="button" onClick={() => navigate("/register")}>
          Regístrate
        </button>
      </p>
    </div>
  </div>
);
}