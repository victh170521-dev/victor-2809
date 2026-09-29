import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshUser } = useAuth();


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Las contraseñas no coinciden");
    return;
  }

  try {
  await register(fullName, email, password);
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
      <h1>Crear cuenta</h1>

      <p className="auth-subtitle">
        Regístrate para comenzar
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Nombre completo</label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

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

        <div className="auth-field">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit">
          Registrarse
        </button>
      </form>

      <p className="auth-switch">
        ¿Ya tienes una cuenta?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
        >
          Inicia sesión
        </button>
      </p>
    </div>
  </div>
);
}