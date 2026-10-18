"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const user = await login({ email, password });
      setUser(user);
      router.push("/profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign In</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input className={css.input} id="email" type="email" name="email" required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input className={css.input} id="password" type="password" name="password" required />
        </div>

        {error && (
          <p className={css.error} role="alert">
            {error}
          </p>
        )}

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <p>
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}
