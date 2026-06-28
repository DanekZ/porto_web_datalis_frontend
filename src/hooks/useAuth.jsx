import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("admin_token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Email atau password salah.");
    const data = await res.json();
    localStorage.setItem("admin_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
