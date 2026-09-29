
//entidad usuario
export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  salt: string;
  balance: number;
}

//entidad sesion
export interface Session {
  userId: string;
  email: string;
}

//funcion para crear un salt seguro con crypto
function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

//funcion para generar hash de contraseña, se agrega encode PBKDF2 para mas seguridad
async function hashPassword(
  password: string,
  salt: string
): Promise<string> {

  const encoder = new TextEncoder();

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    256
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

//crear el usuario
export async function register(
  fullName: string,
  email: string,
  password: string
): Promise<User> {

    if (!fullName.trim() || !email.trim() || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
    throw new Error("El correo electrónico no es válido");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
    throw new Error(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial"
    );
    }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const user: User = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    passwordHash,
    salt,
    balance: 0,
  };

  localStorage.setItem("user", JSON.stringify(user));

  const session: Session = {
  userId: user.id,
  email: user.email,
    };

    localStorage.setItem("session", JSON.stringify(session));

  return user;
}

//login usuario
export async function login(
  email: string,
  password: string
): Promise<User> {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    throw new Error("Usuario no encontrado");
  }

  const user: User = JSON.parse(storedUser);

  const normalizedEmail = email.trim().toLowerCase();

  if (user.email !== normalizedEmail) {
    throw new Error("Correo o contraseña incorrectos");
  }

  const passwordHash = await hashPassword(password, user.salt);

  if (passwordHash !== user.passwordHash) {
    throw new Error("Correo o contraseña incorrectos");
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
  };

  localStorage.setItem("session", JSON.stringify(session));

  return user;
}

//logout usuario
export function logout(): void {
  localStorage.removeItem("session");
}

//getUser si logeado
export function getCurrentUser(): User | null {
  const storedSession = localStorage.getItem("session");
  const storedUser = localStorage.getItem("user");

  if (!storedSession || !storedUser) {
    return null;
  }

  const session: Session = JSON.parse(storedSession);
  const user: User = JSON.parse(storedUser);

  if (session.userId !== user.id) {
    return null;
  }

  return user;
}

//debitaje 
export function updateBalance(amount: number): User | null {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  user.balance += amount;

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}