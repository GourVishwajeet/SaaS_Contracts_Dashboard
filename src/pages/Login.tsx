import React, { use, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const login = auth?.login;
  const navigate = useNavigate();

  interface LoginCredentials {
    username: string;
    password: string;
  }

  interface AuthContextType {
    login: (credentials: LoginCredentials) => Promise<{ token: string }>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await (login)(username, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-sm text-slate-600">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm p-2"
              placeholder="username"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-sm  text-slate-600">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 block w-full rounded-md border border-slate-200 shadow-sm p-2"
              placeholder="test123"
              required
            />
          </label>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4">
          Password for demo: <strong>test123</strong>
        </p>
      </div>
    </div>
  );
}
