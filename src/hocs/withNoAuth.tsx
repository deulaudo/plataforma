"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import PageLoading from "@/components/PageLoading";
import { useAuthStore } from "@/stores/authStore";

const withNoAuth = (Component: React.ComponentType) => {
  return function NoAuthComponent() {
    const router = useRouter();
    const { user, loadingUser } = useAuthStore();

    useEffect(() => {
      if (!loadingUser && user) {
        router.replace("/");
      }
    }, [loadingUser, user, router]);

    if (loadingUser || user) {
      return <PageLoading />;
    }

    return <Component />;
  };
};

export default withNoAuth;
