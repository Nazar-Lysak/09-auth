"use client";

import { useMutation } from "@tanstack/react-query";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

function SignInPage() {
  const { setUser } = useAuthStore()
  const [error, setError] = useState("");
  const router = useRouter();

  const createNoteMutation = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (user) => {
      setUser(user);
      router.push("/profile");
    },

    onError: (err) => {
      setError(err.message)
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    createNoteMutation.mutate({ email, password })

  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={(e) => onSubmit(e)}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}

export default SignInPage;
