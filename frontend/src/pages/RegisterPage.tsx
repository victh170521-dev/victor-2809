import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Las contraseñas no coinciden");
    return;
  }

  try {
  await register(fullName, email, password);
  navigate("/dashboard");
} catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
}

  return (
    <div>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p>{error}</p>}

        <button type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}