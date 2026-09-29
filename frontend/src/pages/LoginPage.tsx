import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");

  try {
    await login(email, password);
    navigate("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
  }
}

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        
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

      {error && <p>{error}</p>}

      <button>Iniciar sesión</button>

      </form>
    </div>
  );
}