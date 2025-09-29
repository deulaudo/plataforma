"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useSelectedProduct } from "@/hooks/useSelectedProduct";

const StudyModeLayout = ({ children }: { children: React.ReactNode }) => {
  const { selectedProduct } = useSelectedProduct();
  const router = useRouter();

  useEffect(() => {
    if (selectedProduct && !selectedProduct.modes.exam) {
      router.replace("/");
    }
  }, [router, selectedProduct]);

  return children;
};

export default StudyModeLayout;
