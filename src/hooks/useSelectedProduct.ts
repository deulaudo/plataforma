import { useCallback } from "react";

import { useProductStore } from "@/stores/productStore";
import { ProductType } from "@/types/productType";

export const useSelectedProduct = () => {
  const { selectedProduct, setSelectedProduct, clearSelectedProduct } =
    useProductStore();

  const selectProduct = useCallback(
    (product: ProductType) => {
      setSelectedProduct(product);
    },
    [setSelectedProduct],
  );

  const clearProduct = useCallback(() => {
    clearSelectedProduct();
  }, [clearSelectedProduct]);

  const isProductSelected = useCallback(
    (productId: string) => {
      return selectedProduct?.id === productId;
    },
    [selectedProduct],
  );

  return {
    selectedProduct,
    selectProduct,
    clearProduct,
    isProductSelected,
  };
};
