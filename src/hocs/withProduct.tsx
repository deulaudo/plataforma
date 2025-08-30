"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

/**
 * HOC to protect routes that require the user to have at least one product.
 */
function withSomeProduct<T extends {}>(Component: React.ComponentType<T>) {
  return function ProductProtectedComponent(props: T) {
    const router = useRouter();
    const { user, loadingUser } = useAuthStore();

    useEffect(() => {
      if (user && user.role !== "ADMIN" && user.products.length === 0) {
        router.replace("/no-product");
      }
    }, [loadingUser, user, router]);

    // Render the component if user has products
    return <Component {...props} />;
  };
}

export default withSomeProduct;
