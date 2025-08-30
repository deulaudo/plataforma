import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ProductType } from "@/types/productType";

type ProductStoreType = {
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType | null) => void;
  clearSelectedProduct: () => void;
};

export const useProductStore = create<ProductStoreType>()(
  persist(
    (set) => ({
      selectedProduct: null,

      setSelectedProduct: (product) => set({ selectedProduct: product }),

      clearSelectedProduct: () => set({ selectedProduct: null }),
    }),
    {
      name: "deulaudo-selected-product", // nome da chave no localStorage
      partialize: (state) => ({ selectedProduct: state.selectedProduct }), // apenas o produto selecionado será persistido
    },
  ),
);
