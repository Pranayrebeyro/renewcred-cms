"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "./authApi";
import { loginSuccess } from "./authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      dispatch(loginSuccess(token));

      router.push("/dashboard");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-bold">
        RenewCred Admin
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-2 block">Email</label>

          <input
            type="email"
            className="w-full rounded border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block">Password</label>

          <input
            type="password"
            className="w-full rounded border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}