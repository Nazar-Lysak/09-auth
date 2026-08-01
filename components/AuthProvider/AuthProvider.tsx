"use client";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {

  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    async function fetchUser() {
      const isAuth = await checkSession();

      if (isAuth) {
        const user = await getMe();

        if (user) {
          setUser(user)
        } else {
          clearIsAuthenticated()
        }

      } else {
        clearIsAuthenticated()
      }

    }

    fetchUser();
  }, [clearIsAuthenticated])
  return <div>{children}</div>;
}

export default AuthProvider;
