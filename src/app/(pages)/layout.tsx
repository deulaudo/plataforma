"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useAuthStore } from "@/stores/authStore";

const queryClient = new QueryClient();

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full">{children}</div>
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
};

export default PagesLayout;
