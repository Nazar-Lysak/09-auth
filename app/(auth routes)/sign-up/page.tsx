"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/lib/api/clientApi";



function SignUpPage() {

  const [error, setError] = useState("")

  const router = useRouter();

  const createNoteMutation = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: () => {
      router.push("/profile");
    },

    onError: (err) => {
      setError(err.message)
      console.log(err)
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={(e) => onSubmit(e)}>
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
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}

export default SignUpPage;
