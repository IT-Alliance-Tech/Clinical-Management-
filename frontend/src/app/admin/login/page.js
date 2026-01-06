"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     const res = await fetch(`${API_BASE_URL}/api/admin/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("adminToken", data.token);

      // Redirect (dashboard will be created later)
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="w-full mt-1 px-4 py-2 border rounded-lg 
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-green-500"
  placeholder="admin@clinic.com"
/>

          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  className="w-full mt-1 px-4 py-2 border rounded-lg 
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-green-500"
  placeholder="********"
/>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
