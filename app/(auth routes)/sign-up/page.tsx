"use client";

import { useMutation } from "@tanstack/react-query";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/lib/api/clientApi";

interface RegisterData {
  email: string;
  password: string;
}

function SignUpPage() {
  const [error, setError] = useState("");

  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => register(data),

    onSuccess: () => {
      router.push("/profile");
    },

    onError: (err: Error) => {
      setError(err.message);
      console.log(err);
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return;
    }

    registerMutation.mutate({
      email,
      password,
    });
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} onSubmit={onSubmit}>
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
          <button
            type="submit"
            className={css.submitButton}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}

export default SignUpPage;