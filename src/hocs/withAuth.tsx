"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import LoadingPage from "@/components/PageLoading";
import { useAuthStore } from "@/stores/authStore";

function withAuth<T extends {}>(
  Component: React.ComponentType<T>,
  options?: { onlyAdmin?: boolean },
) {
  return function AuthComponent(props: T) {
    const router = useRouter();
    const { user, loadingUser } = useAuthStore();

    // Perform navigation as a side effect after render
    useEffect(() => {
      if (!loadingUser && !user) {
        router.replace("/auth/login");
      } else if (
        !loadingUser &&
        user &&
        options?.onlyAdmin &&
        user.role !== "ADMIN"
      ) {
        router.replace("/"); // Redirect to home if not admin
      }
    }, [loadingUser, user, router]);

    if (loadingUser || !user) {
      return <LoadingPage />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
